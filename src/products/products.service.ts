import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto';
// import { UpdateProductDto } from './dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { validate as isUUID } from 'uuid';
import { ProductImage, ProductSize } from './entities';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { extractPublicId } from 'src/common/helpers';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name); // this is going to help us to log errors

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
    @InjectRepository(ProductSize)
    private readonly productSizeRepository: Repository<ProductSize>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    images: Express.Multer.File[],
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const {
        images: dtoImages = [],
        productSizes,
        ...productDetails
      } = createProductDto;

      // Create the product without sizes first
      const product = this.productRepository.create(productDetails);
      await queryRunner.manager.save(product);

      // Create each product size
      if (productSizes && productSizes.length > 0) {
        const sizes = productSizes.map((sizeData) =>
          this.productSizeRepository.create({
            ...sizeData,
            product,
          }),
        );
        await queryRunner.manager.save(sizes);
      }

      // Process images from files
      const uploadedImageUrls = await Promise.all(
        images.map((image) =>
          this.cloudinaryService.uploadImage(image.buffer, image.originalname),
        ),
      );

      // Process images from DTO (URLs)
      const allImageUrls = [...dtoImages, ...uploadedImageUrls];

      // Create product images
      if (allImageUrls.length > 0) {
        const productImages = allImageUrls.map((url) =>
          this.productImageRepository.create({
            url,
            product,
          }),
        );
        await queryRunner.manager.save(productImages);
      }

      await queryRunner.commitTransaction();

      return this.findOnePlain(product.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handleDBExceptions(error);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    try {
      const products = await this.productRepository.find({
        take: limit,
        skip: offset,
        relations: { images: true, productSizes: true },
      });
      return products.map(({ images, productSizes, ...rest }) => ({
        ...rest,
        images: images.map((image) => image.url),
        productSizes,
      }));
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(term: string) {
    let product: Product;

    if (isUUID(term)) {
      product = await this.productRepository.findOne({
        where: { id: term },
        relations: ['images', 'productSizes'],
      });
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder('prod');
      product = await queryBuilder
        .where('UPPER(title) = :title or slug = :slug', {
          title: term.toUpperCase(),
          slug: term.toLowerCase(),
        })
        .leftJoinAndSelect('prod.images', 'prodImages')
        .leftJoinAndSelect('prod.productSizes', 'prodSizes')
        .getOne();
    }

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async findOnePlain(term: string) {
    const {
      images = [],
      productSizes = [],
      ...rest
    } = await this.findOne(term);
    return {
      ...rest,
      images: images.map((image) => image.url),
      productSizes,
    };
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
    images: Express.Multer.File[],
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const {
        images: dtoImages = [],
        productSizes,
        ...toUpdate
      } = updateProductDto;

      // Find the product
      const product = await this.productRepository.findOne({
        where: { id },
        relations: ['images', 'productSizes'],
      });

      if (!product) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      // Update product details
      const updatedProduct = await queryRunner.manager.preload(Product, {
        id,
        ...toUpdate,
      });

      // Handle product sizes update if provided
      if (productSizes && productSizes.length > 0) {
        // Remove existing sizes
        if (product.productSizes?.length) {
          await queryRunner.manager.remove(product.productSizes);
        }

        // Create new sizes
        const newSizes = productSizes.map((sizeData) =>
          this.productSizeRepository.create({
            ...sizeData,
            product: updatedProduct,
          }),
        );
        await queryRunner.manager.save(newSizes);
      }

      // Process uploaded file images
      const uploadedImageUrls = await Promise.all(
        images.map((image) =>
          this.cloudinaryService.uploadImage(image.buffer, image.originalname),
        ),
      );

      // Process images from DTO (URLs)
      if (dtoImages.length > 0 || uploadedImageUrls.length > 0) {
        // If we're replacing images, remove existing ones
        if (product.images?.length) {
          // Delete from Cloudinary first
          await Promise.all(
            product.images.map((image) => {
              const publicId = extractPublicId(image.url);
              return this.cloudinaryService.deleteImage(publicId);
            }),
          );
          // Then remove from database
          await queryRunner.manager.remove(product.images);
        }

        // Create new images
        const allImageUrls = [...dtoImages, ...uploadedImageUrls];
        const productImages = allImageUrls.map((url) =>
          this.productImageRepository.create({
            url,
            product: updatedProduct,
          }),
        );
        await queryRunner.manager.save(productImages);
      }

      // Save the updated product
      await queryRunner.manager.save(updatedProduct);
      await queryRunner.commitTransaction();

      return this.findOnePlain(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handleDBExceptions(error);
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    if (!product) {
      throw new BadRequestException('Product not found');
    }

    // Delete images from Cloudinary
    if (product.images?.length) {
      await Promise.all(
        product.images.map((image) => {
          const publicId = extractPublicId(image.url);
          return this.cloudinaryService.deleteImage(publicId);
        }),
      );
    }

    await this.productRepository.remove(product);
    return { message: 'Product deleted successfully' };
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }

  async deleteAllProducts() {
    const query = this.productRepository.createQueryBuilder('prod');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
}

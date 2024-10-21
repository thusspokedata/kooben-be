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
import { ProductImage } from './entities';
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
      const { images: dtoImages = [], ...productDetails } = createProductDto;
      const product = this.productRepository.create(productDetails);
      await queryRunner.manager.save(product);

      // Upload images to Cloudinary
      const imageUrls = await Promise.all(
        images.map((image) =>
          this.cloudinaryService.uploadImage(image.buffer, image.originalname),
        ),
      );

      const allImageUrls = [...dtoImages, ...imageUrls];

      // Create ProductImage entities
      const productImages = allImageUrls.map((url) =>
        this.productImageRepository.create({ url, product }),
      );

      // save ascociated images to the productImages table
      await queryRunner.manager.save(productImages);

      await queryRunner.commitTransaction();
      return { ...product, images: imageUrls };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handleDBExceptions(error);
    } finally {
      await queryRunner.release();
    }
  }

  // async findAll(paginationDto: PaginationDto) {
  //   const { limit = 10, offset = 0 } = paginationDto;
  //   try {
  //     const products = await this.productRepository.find({
  //       take: limit,
  //       skip: offset,
  //       relations: { images: true },
  //     });
  //     return products.map(({ images, ...rest }) => ({
  //       ...rest,
  //       images: images.map((image) => image.url),
  //     }));
  //   } catch (error) {
  //     this.handleDBExceptions(error);
  //   }
  // }

  async findAll(paginationDto: PaginationDto, category?: string) {
    const { limit = 10, offset = 0 } = paginationDto;

    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .take(limit)
      .skip(offset)
      .leftJoinAndSelect('product.images', 'images');

    // If a category filter is provided, add a where condition
    if (category) {
      queryBuilder.andWhere('product.category = :category', { category });
    }

    try {
      const products = await queryBuilder.getMany();
      return products.map(({ images, ...rest }) => ({
        ...rest,
        images: images.map((image) => image.url),
      }));
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(term: string) {
    let product: Product;

    if (isUUID(term)) {
      product = await this.productRepository.findOneBy({ id: term }); // findOneBy is the one that works
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder('prod');
      product = await queryBuilder
        .where('UPPER(title) = :title or slug = :slug', {
          title: term.toUpperCase(),
          slug: term.toLowerCase(),
        })
        .leftJoinAndSelect('prod.images', 'prodImages')
        .getOne();
    }

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    return product;
  }

  async findOnePlain(term: string) {
    const { images = [], ...rest } = await this.findOne(term);
    return {
      ...rest,
      images: images.map((image) => image.url),
    };
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
    images: Express.Multer.File[],
  ) {
    const { images: dtoImages = [], ...toUpdate } = updateProductDto;

    // Load the product with its current images
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['images'], // Ensure images are loaded with the product
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let uploadedImageUrls = [];

      // Upload new images to Cloudinary
      if (images && images.length > 0) {
        uploadedImageUrls = await Promise.all(
          images.map((image) =>
            this.cloudinaryService.uploadImage(
              image.buffer,
              image.originalname,
            ),
          ),
        );
      }

      // Combine existing images, DTO images, and newly uploaded images
      const allImageUrls = [...dtoImages, ...uploadedImageUrls];

      if (allImageUrls && allImageUrls.length > 0) {
        // Create new ProductImage entities for the new URLs
        const newImages = allImageUrls.map((imageUrl) =>
          this.productImageRepository.create({ url: imageUrl, product }),
        );

        // Combine new images with the existing ones, preserving the association
        product.images = [...product.images, ...newImages];
      }

      // Update product details
      Object.assign(product, toUpdate);

      // Save the product and its images
      await queryRunner.manager.save(product);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    if (!product) {
      throw new BadRequestException('Producto no encontrado');
    }

    // Extrac publicIds from the images associated with the product
    const imagePublicIds = product.images.map((image) =>
      extractPublicId(image.url),
    );

    // Delete the images from Cloudinary
    await Promise.all(
      imagePublicIds.map((publicId) =>
        this.cloudinaryService.deleteImage(publicId),
      ),
    );

    await this.productRepository.remove(product);
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

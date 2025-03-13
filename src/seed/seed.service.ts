import { Injectable, Logger } from '@nestjs/common';
import { ProductsService } from './../products/products.service';
import { initialData } from './data/seed-data';
import { CreateProductDto } from 'src/products/dto';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(private productsService: ProductsService) {}

  async runSeed() {
    try {
      await this.insertNewProducts();
      return 'SEED EXECUTED';
    } catch (error) {
      this.logger.error(`Error en seed: ${error.message}`);
      return `ERROR: ${error.message}`;
    }
  }

  private async insertNewProducts() {
    await this.productsService.deleteAllProducts();

    const products = initialData.products;

    for (const product of products) {
      const productDto: CreateProductDto = {
        title: product.title,
        price: product.price,
        description: product.description,
        slug: product.slug,
        productSizes: product.productSizes,
        category: product.category,
        color: product.color,
        material: product.material,
        length: product.length,
        width: product.width,
        height: product.height,
        tags: product.tags,
        images: product.images,
      };

      try {
        await this.productsService.create(productDto, []);
      } catch (error) {
        this.logger.error(
          `Error al crear producto ${product.title}: ${error.message}`,
        );
        throw error;
      }
    }

    return true;
  }
}

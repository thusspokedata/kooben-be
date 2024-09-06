import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, ProductImage } from './entities';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, CloudinaryService],
  imports: [
    TypeOrmModule.forFeature([Product, ProductImage]),
    CloudinaryModule,
  ],
  exports: [ProductsService, TypeOrmModule],
})
export class ProductsModule {}

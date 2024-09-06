import { forwardRef, Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from '../products/products.module';

@Module({
  controllers: [CloudinaryController],
  providers: [CloudinaryService],
  exports: [CloudinaryService],
  imports: [
    ConfigModule,
    forwardRef(() => ProductsModule), // Using forwardRef to avoid circular dependency
  ],
})
export class CloudinaryModule {}

import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('No file provided');

    const secureUrl = await this.cloudinaryService.uploadImage(
      file.buffer,
      file.originalname,
    );

    return { secureUrl };
  }

  @Get('optimized/:publicId')
  getOptimizedUrl(@Param('publicId') publicId: string) {
    const url = this.cloudinaryService.getOptimizedUrl(publicId);
    return { url };
  }

  @Get('autocrop/:publicId')
  getAutoCroppedUrl(@Param('publicId') publicId: string) {
    const url = this.cloudinaryService.getAutoCroppedUrl(publicId);
    return { url };
  }
}

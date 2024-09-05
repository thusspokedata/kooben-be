import { join } from 'path';
import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';

@Injectable()
export class FilesService {
  getStaticProductImages(imageName: string) {
    const path = join(__dirname, '../../static/product-images', imageName);

    if (!existsSync(path))
      throw new BadRequestException(`Image with ID: ${imageName} not found`);

    return path;
  }
}

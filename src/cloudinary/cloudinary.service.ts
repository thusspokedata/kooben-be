import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { fileNamer } from 'src/common/helpers';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(
    fileBuffer: Buffer,
    originalFileName: string,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let generatedFileName: string;

      // Generar el publicId con el helper
      fileNamer(
        null,
        { originalname: originalFileName } as Express.Multer.File,
        (err, fileName) => {
          if (err) reject(err);
          generatedFileName = fileName;
        },
      );

      cloudinary.uploader
        .upload_stream({ public_id: generatedFileName }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        })
        .end(fileBuffer);
    });
  }

  getOptimizedUrl(publicId: string) {
    return cloudinary.url(publicId, {
      fetch_format: 'auto',
      quality: 'auto',
    });
  }

  getAutoCroppedUrl(publicId: string) {
    return cloudinary.url(publicId, {
      crop: 'auto',
      gravity: 'auto',
      width: 500,
      height: 500,
    });
  }
}

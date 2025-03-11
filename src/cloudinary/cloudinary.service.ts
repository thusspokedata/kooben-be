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

      fileNamer(
        null,
        { originalname: originalFileName } as Express.Multer.File,
        (err, fileName) => {
          if (err) reject(err);
          generatedFileName = fileName;
        },
      );

      cloudinary.uploader
        .upload_stream(
          {
            upload_preset: 'kooben',
            public_id: generatedFileName,
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          },
        )
        .end(fileBuffer);
    });
  }

  getOptimizedUrl(publicId: string) {
    return cloudinary.url(publicId, {
      fetch_format: 'auto',
      quality: 'auto',
    });
  }

  async deleteImage(publicId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
}

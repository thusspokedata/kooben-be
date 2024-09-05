import { BadRequestException } from '@nestjs/common';

export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!file) return callback(new Error('No file provided'), false);

  const fileExtension = file.mimetype.split('/')[1];
  const validExtensions = process.env.VALID_EXTENSIONS?.split(',') || [];

  if (!validExtensions.includes(fileExtension)) {
    return callback(
      new BadRequestException({
        statusCode: 400,
        message: `Invalid file type. Allowed types are: ${validExtensions.join(', ')}`,
        error: 'Bad Request',
      }),
      false,
    );
  }

  callback(null, true);
};

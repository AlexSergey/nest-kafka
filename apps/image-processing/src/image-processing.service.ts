import gm from 'gm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageProcessingService {
  resize(imageUrl: string): Promise<Error | Buffer> {
    return new Promise((resolve, reject) => {
      gm(imageUrl)
        .resize(353, 257)
        .toBuffer((err, buffer) => {
          if (err) {
            return reject(err);
          }
          return resolve(buffer);
        });
    });
  }
}

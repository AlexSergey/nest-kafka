import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(message: string): string {
    return 'Hello World From Consumer! ' + message;
  }
}

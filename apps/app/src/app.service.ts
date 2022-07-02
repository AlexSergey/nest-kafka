import { Injectable } from '@nestjs/common';
import { GeneratorType, GENERATOR_TYPES } from '@app/contracts';

@Injectable()
export class AppService {
  getGeneratorType(): GeneratorType {
    return { generatorType: GENERATOR_TYPES.user };
  }
}

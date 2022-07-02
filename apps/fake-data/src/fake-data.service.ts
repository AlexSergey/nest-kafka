import { Injectable } from '@nestjs/common';
import {
  GENERATOR_TYPES,
  GeneratedUserDataInterface,
  GeneratedUserAdditionalDataInterface,
} from '@app/contracts';
import { faker } from '@faker-js/faker';

@Injectable()
export class FakeServiceService {
  async generateByType(
    type: GENERATOR_TYPES,
  ): Promise<GeneratedUserDataInterface> {
    return {
      [GENERATOR_TYPES.user]: {
        name: faker.name.firstName(),
        image: faker.image.people(500, 300),
        email: faker.internet.email(),
        phoneNumber: faker.phone.phoneNumber(),
      },
    }[type];
  }

  async getAdditionalData(
    type: GENERATOR_TYPES,
  ): Promise<GeneratedUserAdditionalDataInterface> {
    return {
      [GENERATOR_TYPES.user]: {
        avatar: faker.image.avatar(),
      },
    }[type];
  }
}

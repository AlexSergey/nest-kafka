export enum GENERATOR_TYPES {
  user = 'user',
}

export type GeneratorType = {
  generatorType: GENERATOR_TYPES;
};

export interface GeneratedUserDataInterface {
  name: string;
  image: string;
  email: string;
  phoneNumber: string;
}

export interface GeneratedUserAdditionalDataInterface {
  avatar: string;
  avatar_thumbnail?: string;
}

export type GeneratedUser = GeneratedUserDataInterface &
  GeneratedUserAdditionalDataInterface;

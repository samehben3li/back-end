import { faker } from '@faker-js/faker';
import {
  adminEmail,
  adminPassword,
  awsCloudFront,
  userEmail,
  userPassword,
} from '../config';
import { IFlag, IUserInfo } from '../interfaces';

export const adminCredentials = {
  email: adminEmail,
  password: adminPassword,
};

export const corretUserInfo = {
  email: userEmail,
  password: userPassword,
};

export const incorrectUserInfo = {
  email: 'incorrect@test.com',
  password: 'test123',
};

const fakeLocation = {
  left: ['TOP', 'BOTTOM'],
  right: ['MIDDLE'],
};

export const flag: IFlag = {
  riskCategory: {
    name: 'PEST',
    imgUrl: `${awsCloudFront}risk-category/pest.svg`,
  },
  riskCategoryType: {
    name: 'WHITE FLY',
    imgUrl: `${awsCloudFront}risk-category-type/pest/WHITE-FLY.svg`,
  },
  plantPart: {
    name: 'FRUIT',
    imgUrl: `${awsCloudFront}plant-part/fruit.svg`,
  },
  location: fakeLocation,
};

export const fakeUser = () => {
  const fakeName = faker.name.fullName();
  return {
    email: faker.internet.email(fakeName),
    username: faker.internet.userName(fakeName),
    password: faker.internet.password(8),
  };
};

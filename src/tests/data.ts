import { faker } from '@faker-js/faker';
import {
  adminEmail,
  adminPassword,
  awsCloudFront,
  userEmail,
  userPassword,
} from '../config';
import { IFlag, IRiskCategory, IUserInfo } from '../interfaces';

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

export const fakeUser = (): IUserInfo => {
  const fakeName = faker.name.fullName();
  return {
    email: faker.internet.email(fakeName),
    username: faker.internet.userName(fakeName),
    password: faker.internet.password(8),
  };
};

export const incorrectUserId = 'incorrect-user-id';

export const newRiskCategory: IRiskCategory = {
  name: 'TEST_ADD',
  imgUrl: `${awsCloudFront}static.svg`,
  riskCategoryTypes: [
    {
      name: 'TYPE_1',
      imgUrl: `${awsCloudFront}static.svg`,
    },
    {
      name: 'TYPE_2',
      imgUrl: `${awsCloudFront}static.svg`,
    },
    {
      name: 'TYPE_3',
      imgUrl: `${awsCloudFront}static.svg`,
    },
    {
      name: 'TYPE_4',
      imgUrl: `${awsCloudFront}static.svg`,
    },
  ],
};

export const newType = {
  name: 'TYPE_ADD',
  imgUrl: `${awsCloudFront}static.svg`,
};

export const updateTypeInfo = {
  name: 'TYPE_UPDATE',
  imgUrl: `${awsCloudFront}static.svg`,
};

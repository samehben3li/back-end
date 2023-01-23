import { IFlag } from './interfaces';

const awsCloudFront = process.env.AWS_CLOUD_FRONT_URL;

export const corretUserInfo = {
  email: 'test4test@test.com',
  password: 'test123',
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

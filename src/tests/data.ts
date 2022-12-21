import { IFlag } from './interfaces';

export const corretUserInfo = {
  email: 'test@test.com',
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
    imgUrl: 'https://d17acd7teg556d.cloudfront.net/risk-category/pest.svg',
  },
  riskCategoryType: {
    name: 'WHITE FLY',
    imgUrl:
      'https://d17acd7teg556d.cloudfront.net/risk-category-type/pest/WHITE-FLY.svg',
  },
  plantPart: {
    name: 'FRUIT',
    imgUrl: 'https://d17acd7teg556d.cloudfront.net/plant-part/fruit.svg',
  },
  location: fakeLocation,
};

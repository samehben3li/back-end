import request from 'supertest';
import { IRiskCategory } from '../interfaces';
import server from '../..';
import getRiskCategoriesQuery from '../query/getRiskCategoriesQuery';

const getRiskCategories = async (
  token: string,
): Promise<Array<IRiskCategory>> => {
  const response = await request(server)
    .post('/')
    .send(getRiskCategoriesQuery)
    .set({
      Authorization: token,
    });
  const riskCategories = response?.body?.data?.getRiskCategories;
  server.close();
  return riskCategories;
};

export default getRiskCategories;

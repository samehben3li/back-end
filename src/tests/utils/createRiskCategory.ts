import request from 'supertest';
import server from '../..';
import { IRiskCategory } from '../../interfaces';
import { createRiskCategoryMutation } from '../mutation';

const createRiskCategory = async (
  token: string,
  riskCategory: IRiskCategory,
) => {
  const response = await request(server)
    .post('/')
    .send(createRiskCategoryMutation(riskCategory))
    .set({
      Authorization: token,
    });
  server.close();
  return response;
};

export default createRiskCategory;

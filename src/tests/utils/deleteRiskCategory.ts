import request from 'supertest';
import server from '../..';
import { deleteRiskCategoryMutation } from '../mutation';

const deleteRiskCategory = async (token: string, riskCategoryId: string) => {
  const response = await request(server)
    .post('/')
    .send(deleteRiskCategoryMutation(riskCategoryId))
    .set({
      Authorization: token,
    });
  server.close();
  return response;
};

export default deleteRiskCategory;

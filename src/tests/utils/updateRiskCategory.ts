import request from 'supertest';
import server from '../..';
import { updateRiskCategoryMutation } from '../mutation';

const updateRiskCategory = async (
  token: string,
  id: string,
  name: string,
  imgUrl: string,
) => {
  const response = await request(server)
    .post('/')
    .send(updateRiskCategoryMutation(id, name, imgUrl))
    .set({
      Authorization: token,
    });
  server.close();
  return response;
};

export default updateRiskCategory;

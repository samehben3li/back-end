import request from 'supertest';
import server from '../..';
import { deleteTypeMutation } from '../mutation';

const deleteType = async (
  token: string,
  riskCategoryId: string,
  riskCategoryTypeId: string,
) => {
  const response = await request(server)
    .post('/')
    .send(deleteTypeMutation(riskCategoryId, riskCategoryTypeId))
    .set({
      Authorization: token,
    });
  server.close();
  return response;
};

export default deleteType;

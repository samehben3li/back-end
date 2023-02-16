import request from 'supertest';
import server from '../..';
import { IInputOptions } from '../../interfaces';
import { updateTypeMutation } from '../mutation';

const updateType = async (
  token: string,
  riskCategoryId: string,
  riskCategoryTypeId: string,
  type: IInputOptions,
) => {
  const response = await request(server)
    .post('/')
    .send(updateTypeMutation(riskCategoryId, riskCategoryTypeId, type))
    .set({
      Authorization: token,
    });
  server.close();
  return response;
};

export default updateType;

import request from 'supertest';
import server from '../..';
import { IInputOptions } from '../../interfaces';
import { addTypeMutation } from '../mutation';

const addType = async (token: string, id: string, newType: IInputOptions) => {
  const response = await request(server)
    .post('/')
    .send(addTypeMutation(id, newType))
    .set({
      Authorization: token,
    });
  server.close();
  return response;
};

export default addType;

import request from 'supertest';
import server from '../..';
import { IFlag } from '../../interfaces';
import { addFlagMutation } from '../mutation';

const addFlag = async (token: string, flag: IFlag) => {
  const response = await request(server)
    .post('/')
    .send(addFlagMutation(flag))
    .set({
      Authorization: token,
    });
  server.close();
  return response;
};

export default addFlag;

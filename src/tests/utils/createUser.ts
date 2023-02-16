import request from 'supertest';
import server from '../..';
import { IUserInfo } from '../../interfaces';
import { createUserMutation } from '../mutation';

const createUser = async (token: string, user: IUserInfo) => {
  const response = await request(server)
    .post('/')
    .send(createUserMutation(user))
    .set({
      Authorization: token,
    });
  server.close();
  return response;
};

export default createUser;

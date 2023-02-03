import request from 'supertest';
import server from '../..';
import { IUserInfo } from '../../interfaces';
import { updateUserMutation } from '../mutation';

const updateUser = async (token: string, id: string, userInfo: IUserInfo) => {
  const response = await request(server)
    .post('/')
    .send(updateUserMutation(id, userInfo))
    .set({
      Authorization: token,
    });
  server.close();
  return response;
};

export default updateUser;

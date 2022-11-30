import request from 'supertest';
import server from '../..';
import { corretUserInfo } from '../data';
import loginMutation from '../mutation/loginMutation';

const getTokens = async () => {
  const response = await request(server)
    .post('/')
    .send(loginMutation(corretUserInfo));
  const fakeToken = 'bearer fake.token';
  const token = `bearer ${response?.body?.data?.login?.accessToken}`;
  server.close();
  return { token, fakeToken };
};

export default getTokens;

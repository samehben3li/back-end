import request from 'supertest';
import server from '../..';
import { adminCredentials, corretUserInfo } from '../data';
import { loginMutation } from '../mutation';

const getTokens = async () => {
  let response = await request(server)
    .post('/')
    .send(loginMutation(corretUserInfo));
  const fakeToken = 'bearer fake.token';
  const userToken = `bearer ${response?.body?.data?.login?.accessToken}`;
  response = await request(server)
    .post('/')
    .send(loginMutation(adminCredentials));
  const adminToken = `bearer ${response?.body?.data?.login?.accessToken}`;
  server.close();
  return { userToken, adminToken, fakeToken };
};

export default getTokens;

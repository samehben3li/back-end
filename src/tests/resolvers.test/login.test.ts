import request from 'supertest';
import server from '../..';
import { corretUserInfo, incorrectUserInfo } from '../data';
import loginMutation from '../mutation/loginMutation';

describe('Login', () => {
  afterAll(async () => {
    server.close();
  });
  it('testing login functionality', async () => {
    // correct credentials
    let response = await request(server)
      .post('/')
      .send(loginMutation(corretUserInfo));
    expect(response?.body?.data?.login).toBeTruthy();
    expect(response?.body?.data?.login).toHaveProperty('accessToken');
    expect(response?.body?.data?.login).toHaveProperty('user');

    // incorrect credentials
    response = await request(server)
      .post('/')
      .send(loginMutation(incorrectUserInfo));
    expect(response?.body?.data).toBeNull();
    expect(response?.body?.errors).toBeTruthy();
  });
});

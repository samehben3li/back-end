import request from 'supertest';
import server from '../../..';
import { getAllUsersQuery } from '../../query';
import { getTokens } from '../../utils';

describe('Get_ALL_USERS', () => {
  afterAll(async () => {
    server.close();
  });
  it('testing getAllUsers functionnality', async () => {
    const { adminToken, userToken, fakeToken } = await getTokens();

    // with admin access token
    let response = await request(server).post('/').send(getAllUsersQuery).set({
      Authorization: adminToken,
    });
    expect(response?.body?.data?.getUsers).toBeTruthy();
    expect(response?.body?.errors).toBeUndefined();

    // with user token
    response = await request(server).post('/').send(getAllUsersQuery).set({
      Authorization: userToken,
    });
    expect(response?.body?.data).toBeNull();
    expect(response?.body?.errors).toBeTruthy();
    expect(response?.body?.errors[0]?.message).toBe('NOT_AUTHORIZED');

    // with incorrect access token
    response = await request(server).post('/').send(getAllUsersQuery).set({
      Authorization: fakeToken,
    });
    expect(response?.body?.data).toBeNull();
    expect(response?.body?.errors).toBeTruthy();
  });
});

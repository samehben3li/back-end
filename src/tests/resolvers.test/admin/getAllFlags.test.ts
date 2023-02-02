import request from 'supertest';
import server from '../../..';
import { getAllFlagsQuery } from '../../query';
import { getTokens } from '../../utils';

describe('Get_ALL_FLAGS', () => {
  afterAll(async () => {
    server.close();
  });
  it('testing getAllFlags functionnality', async () => {
    const { adminToken, userToken } = await getTokens();

    // with admin access token
    let response = await request(server).post('/').send(getAllFlagsQuery).set({
      Authorization: adminToken,
    });
    expect(response?.body?.data?.getAllFlags).toBeTruthy();
    expect(response?.body?.errors).toBeUndefined();

    // with user token
    response = await request(server).post('/').send(getAllFlagsQuery).set({
      Authorization: userToken,
    });
    expect(response?.body?.data).toBeNull();
    expect(response?.body?.errors).toBeTruthy();
    expect(response?.body?.errors[0]?.message).toBe('NOT_AUTHORIZED');
  });
});

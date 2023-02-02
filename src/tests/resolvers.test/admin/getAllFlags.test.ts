import request from 'supertest';
import server from '../../..';
import { getAllFlagsQuery } from '../../query';
import { getTokens } from '../../utils';

describe('Get_ALL_FLAGS', () => {
  afterAll(async () => {
    server.close();
  });
  it('testing getAllFlags functionnality', async () => {
    const { adminToken } = await getTokens();
    // with admin access token
    const response = await request(server)
      .post('/')
      .send(getAllFlagsQuery)
      .set({
        Authorization: adminToken,
      });
    expect(response?.body?.data?.getAllFlags).toBeTruthy();
    expect(response?.body?.errors).toBeUndefined();
  });
});

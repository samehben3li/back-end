import request from 'supertest';
import server from '../..';
import getFlagsQuery from '../query/getFlagsQuery';
import getTokens from '../utils/getTokens';

describe('GetFlags', () => {
  afterAll(async () => {
    server.close();
  });
  it('testing getFlags functionnality', async () => {
    const { token, fakeToken } = await getTokens();
    // with correct access token
    let response = await request(server).post('/').send(getFlagsQuery).set({
      Authorization: token,
    });
    expect(response?.body?.data?.getFlags).toBeTruthy();
    expect(response?.body?.errors).toBeUndefined();

    // with incorrect access token
    response = await request(server).post('/').send(getFlagsQuery).set({
      Authorization: fakeToken,
    });
    expect(response?.body?.data).toBeNull();
    expect(response?.body?.errors).toBeTruthy();
  });
});

import server from '../..';
import { flag } from '../data';
import addFlag from '../utils/addFlag';
import getTokens from '../utils/getTokens';

describe('AddFlag', () => {
  afterAll(async () => {
    server.close();
  });
  it('testing addFlag functionnality', async () => {
    const { token, fakeToken } = await getTokens();

    // with correct access token
    let newFlag = await addFlag(token, flag);
    expect(newFlag?.body?.data).toBeTruthy();
    expect(newFlag?.body?.errors).toBeUndefined();
    expect(newFlag?.body?.data?.addFlag).toHaveProperty('id');
    expect(newFlag?.body?.data?.addFlag).toHaveProperty('userId');
    expect(newFlag?.body?.data?.addFlag).toHaveProperty('createdAt');
    expect(newFlag?.body?.data?.addFlag).toHaveProperty('location');
    expect(newFlag?.body?.data?.addFlag).toHaveProperty('plantPart');
    expect(newFlag?.body?.data?.addFlag).toHaveProperty('riskCategory');
    expect(newFlag?.body?.data?.addFlag).toHaveProperty('riskCategoryType');

    // with incorrect access token
    newFlag = await addFlag(fakeToken, flag);
    expect(newFlag?.body?.data).toBeNull();
    expect(newFlag?.body?.errors).toBeTruthy();
  });
});

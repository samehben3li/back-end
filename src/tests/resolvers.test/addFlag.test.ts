import server from '../..';
import { flag } from '../data';
import { getTokens, addFlag } from '../utils';

describe('AddFlag', () => {
  afterAll(async () => {
    server.close();
  });
  it('testing addFlag functionnality', async () => {
    const { userToken, fakeToken } = await getTokens();

    // with correct access token
    let newFlag = await addFlag(userToken, flag);
    expect(newFlag?.body?.data).toBeTruthy();
    expect(newFlag?.body?.errors).toBeUndefined();
    expect(newFlag?.body?.data?.addFlag).toContainKeys([
      'id',
      'userId',
      'createdAt',
      'location',
      'plantPart',
      'riskCategory',
      'riskCategoryType',
    ]);

    // with incorrect access token
    newFlag = await addFlag(fakeToken, flag);
    expect(newFlag?.body?.data).toBeNull();
    expect(newFlag?.body?.errors).toBeTruthy();
  });
});

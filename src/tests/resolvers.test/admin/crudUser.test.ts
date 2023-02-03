import server from '../../..';
import { fakeUser } from '../../data';
import { createUser, getTokens } from '../../utils';

describe('CRUD_USER', () => {
  afterAll(async () => {
    server.close();
  });
  it('testing create user functionnality', async () => {
    // get tokens
    const { fakeToken } = await getTokens();
    const newUserInfo = fakeUser;

    // testing with incorrect access token
    const newUserResponse = await createUser(fakeToken, newUserInfo);
    expect(newUserResponse?.body?.data).toBeNull();
    expect(newUserResponse?.body?.errors).toBeTruthy();
  });
});

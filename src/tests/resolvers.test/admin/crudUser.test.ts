import server from '../../..';
import { fakeUser } from '../../data';
import { createUser, getTokens } from '../../utils';

describe('CRUD_USER', () => {
  afterAll(async () => {
    server.close();
  });
  it('testing create user functionnality', async () => {
    // get tokens
    const { fakeToken, userToken } = await getTokens();
    const newUserInfo = fakeUser;

    // testing with incorrect access token
    let newUserResponse = await createUser(fakeToken, newUserInfo);
    expect(newUserResponse?.body?.data).toBeNull();
    expect(newUserResponse?.body?.errors).toBeTruthy();

    // testing with user token
    newUserResponse = await createUser(userToken, newUserInfo);
    expect(newUserResponse?.body?.data).toBeNull();
    expect(newUserResponse?.body?.errors).toBeTruthy();
    expect(newUserResponse?.body?.errors[0]?.message).toBe('NOT_AUTHORIZED');
  });
});

import server from '../../..';
import { fakeUser } from '../../data';
import { createUser, getTokens } from '../../utils';

describe('CRUD_USER', () => {
  afterAll(async () => {
    server.close();
  });
  it('testing create user functionality', async () => {
    // get tokens
    const { fakeToken, userToken, adminToken } = await getTokens();
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

    // testing with admin token
    newUserResponse = await createUser(adminToken, newUserInfo);
    expect(newUserResponse?.body?.data).toBeTruthy();
    expect(newUserResponse?.body?.errors).toBeUndefined();
    expect(newUserResponse?.body?.data?.createUser).toContainKeys([
      'id',
      'email',
      'username',
      'isAdmin',
    ]);
    expect(newUserResponse?.body?.data?.createUser?.email).toBe(
      newUserInfo.email,
    );
    expect(newUserResponse?.body?.data?.createUser?.username).toBe(
      newUserInfo.username,
    );
  });
});

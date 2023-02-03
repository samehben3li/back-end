import request from 'supertest';
import server from '../../..';
import { fakeUser } from '../../data';
import { getAllUsersQuery } from '../../query';
import { createUser, getTokens } from '../../utils';

describe('CRUD_USER', () => {
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

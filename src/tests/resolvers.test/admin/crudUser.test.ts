import request from 'supertest';
import server from '../../..';
import { corretUserInfo, fakeUser, incorrectUserId } from '../../data';
import { getAllUsersQuery } from '../../query';
import { createUser, deleteUser, getTokens, updateUser } from '../../utils';

describe('CRUD_USER', () => {
  afterAll(async () => {
    server.close();
  });
  let userId: string;
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
    const newUserInfo = fakeUser();

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

    userId = newUserResponse?.body?.data?.createUser?.id;
  });

  it('testing update user functionality', async () => {
    // get tokens
    const { fakeToken, userToken, adminToken } = await getTokens();
    const updateUserInfo = fakeUser();

    // testing with incorrect access token
    let updateUserResponse = await updateUser(
      fakeToken,
      userId,
      updateUserInfo,
    );
    expect(updateUserResponse?.body?.data).toBeNull();
    expect(updateUserResponse?.body?.errors).toBeTruthy();

    // testing with user token
    updateUserResponse = await updateUser(userToken, userId, updateUserInfo);
    expect(updateUserResponse?.body?.data).toBeNull();
    expect(updateUserResponse?.body?.errors).toBeTruthy();
    expect(updateUserResponse?.body?.errors[0]?.message).toBe('NOT_AUTHORIZED');

    // testing with admin token
    updateUserResponse = await updateUser(adminToken, userId, updateUserInfo);
    expect(updateUserResponse?.body?.data).toBeTruthy();
    expect(updateUserResponse?.body?.errors).toBeUndefined();
    expect(updateUserResponse?.body?.data?.updateUser).toContainKeys([
      'id',
      'email',
      'username',
      'isAdmin',
    ]);
    expect(updateUserResponse?.body?.data?.updateUser?.email).toBe(
      updateUserInfo.email,
    );
    expect(updateUserResponse?.body?.data?.updateUser?.username).toBe(
      updateUserInfo.username,
    );

    // testing with incorrect user id
    updateUserResponse = await updateUser(
      adminToken,
      incorrectUserId,
      updateUserInfo,
    );
    expect(updateUserResponse?.body?.data).toBeNull();
    expect(updateUserResponse?.body?.errors).toBeTruthy();
    expect(updateUserResponse?.body?.errors[0]?.message).toBe('USER_NOT_FOUND');

    // testing with existing information
    updateUserResponse = await updateUser(adminToken, userId, corretUserInfo);
    expect(updateUserResponse?.body?.data).toBeNull();
    expect(updateUserResponse?.body?.errors).toBeTruthy();
    expect(updateUserResponse?.body?.errors[0]?.message).toBe(
      'INFORMATION_ALREADY_EXIST',
    );
  });

  it('testing delete user functionality', async () => {
    // get tokens
    const { fakeToken, userToken, adminToken } = await getTokens();

    // testing with incorrect access token
    let deleteUserResponse = await deleteUser(fakeToken, userId);
    expect(deleteUserResponse?.body?.data).toBeNull();
    expect(deleteUserResponse?.body?.errors).toBeTruthy();

    // testing with user token
    deleteUserResponse = await deleteUser(userToken, userId);
    expect(deleteUserResponse?.body?.data).toBeNull();
    expect(deleteUserResponse?.body?.errors).toBeTruthy();
    expect(deleteUserResponse?.body?.errors[0]?.message).toBe('NOT_AUTHORIZED');

    // testing with incorrect user id
    deleteUserResponse = await deleteUser(adminToken, incorrectUserId);
    expect(deleteUserResponse?.body?.data).toBeNull();
    expect(deleteUserResponse?.body?.errors).toBeTruthy();
    expect(deleteUserResponse?.body?.errors[0]?.message).toBe('DATA_NOT_FOUND');

    // testing with admin token
    deleteUserResponse = await deleteUser(adminToken, userId);
    expect(deleteUserResponse?.body?.data).toBeTruthy();
    expect(deleteUserResponse?.body?.errors).toBeUndefined();
    expect(deleteUserResponse?.body?.data?.deleteUser).toBe('DATA_DELETED');
  });
});

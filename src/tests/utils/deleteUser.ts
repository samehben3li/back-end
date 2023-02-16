import request from 'supertest';
import server from '../..';
import { deleteUserMutation } from '../mutation';

const deleteUser = async (token: string, id: string) => {
  const response = await request(server)
    .post('/')
    .send(deleteUserMutation(id))
    .set({
      Authorization: token,
    });
  server.close();
  return response;
};

export default deleteUser;

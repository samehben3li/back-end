import request from 'supertest';
import server from '../..';
import { IFlag } from '../interfaces';
import addFlagMutation from '../mutation/addFlagMutation';

const addFlag = async (token: string, flag: IFlag) => {
  const response = await request(server)
    .post('/graphql')
    .send(addFlagMutation(flag))
    .set({
      Authorization: token,
    });
  console.log(response);
  const newFlag = response?.body?.data?.addFlag;
  server.close();
  return newFlag;
};

export default addFlag;

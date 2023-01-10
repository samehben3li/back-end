import request from 'supertest';
import server from '../..';
import { IInputOptions } from '../../interfaces';
import getPlantPartQuery from '../query/getPlantPartQuery';

const getPlantPart = async (token: string): Promise<Array<IInputOptions>> => {
  const response = await request(server).post('/').send(getPlantPartQuery).set({
    Authorization: token,
  });
  const plantPart = response?.body?.data?.getPlantPart;
  server.close();
  return plantPart;
};

export default getPlantPart;

import request from 'supertest';
import app from '..';
import { CorretUserInfo, IncorrectUserInfo } from './data';
import { IInputOptions, IRiskCategory } from './interfaces';
import loginMutation from './mutation/login';
import getFlags from './query/getFlags';
import getPlantPart from './query/getPlantPart';
import getRiskCategories from './query/getRiskCategories';

describe('e2e demo', () => {
  let token = '';
  const fakeToken = 'barrer fake.token';
  let riskCategories: Array<IRiskCategory>;
  let plantPart: Array<IInputOptions>;
  it('testing login functionality', async () => {
    // correct credentials
    let response = await request(app)
      .post('/')
      .send(loginMutation(CorretUserInfo));
    expect(response?.body?.data?.login).toBeTruthy();
    expect(response?.body?.data?.login).toHaveProperty('accessToken');
    expect(response?.body?.data?.login).toHaveProperty('user');
    token = `barrer ${response.body.data.login.accessToken}`;

    // incorrect credentials
    response = await request(app)
      .post('/')
      .send(loginMutation(IncorrectUserInfo));
    expect(response?.body?.data).toBeNull();
    expect(response?.body?.errors).toBeTruthy();
  });

  it('testing getRiskCategories functionnality', async () => {
    // with correct access token
    let response = await request(app).post('/').send(getRiskCategories).set({
      Authorization: token,
    });
    expect(response?.body?.data?.getRiskCategories).toBeTruthy();
    expect(response?.body?.errors).toBeUndefined();
    riskCategories = response?.body?.data?.getRiskCategories;

    // with incorrect access token
    response = await request(app).post('/').send(getRiskCategories).set({
      Authorization: fakeToken,
    });
    expect(response?.body?.data).toBeNull();
    expect(response?.body?.errors).toBeTruthy();
  });

  it('testing getPlantPart functionnality', async () => {
    // with correct access token
    let response = await request(app).post('/').send(getPlantPart).set({
      Authorization: token,
    });
    expect(response?.body?.data?.getPlantPart).toBeTruthy();
    expect(response?.body?.errors).toBeUndefined();
    plantPart = response?.body?.data?.getPlantPart;

    // with incorrect access token
    response = await request(app).post('/').send(getPlantPart).set({
      Authorization: fakeToken,
    });
    expect(response?.body?.data).toBeNull();
    expect(response?.body?.errors).toBeTruthy();
  });

  it('testing getFlags functionnality', async () => {
    // with correct access token
    let response = await request(app).post('/').send(getFlags).set({
      Authorization: token,
    });
    expect(response?.body?.data?.getFlags).toBeTruthy();
    expect(response?.body?.errors).toBeUndefined();

    // with incorrect access token
    response = await request(app).post('/').send(getFlags).set({
      Authorization: fakeToken,
    });
    expect(response?.body?.data).toBeNull();
    expect(response?.body?.errors).toBeTruthy();
  });

  it('testing icons', async () => {
    let response;
    // testing risk categories icons
    riskCategories.forEach(async rc => {
      response = await request(rc.imgUrl).get('');
      expect(response?.status).toBe(200);
      expect(response?.status).toBeLessThan(400);

      // testing risk categories type icons
      rc.riskCategoryTypes.forEach(async rct => {
        response = await request(rct.imgUrl).get('');
        expect(response?.status).toBe(200);
        expect(response?.status).toBeLessThan(400);
      });
    });

    // testing plant part icons
    plantPart.forEach(async pp => {
      response = await request(pp.imgUrl).get('');
      expect(response?.status).toBe(200);
      expect(response?.status).toBeLessThan(400);
    });
  });
});

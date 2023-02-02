import request from 'supertest';
import server from '../..';
import { getTokens, getRiskCategories, getPlantPart } from '../utils';

describe('Icons', () => {
  afterAll(async () => {
    server.close();
  });
  it('testing icons', async () => {
    let response;
    const { token } = await getTokens();
    const riskCategories = await getRiskCategories(token);
    const plantPart = await getPlantPart(token);

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

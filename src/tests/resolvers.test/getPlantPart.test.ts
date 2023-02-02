import server from '../..';
import { getTokens, getPlantPart } from '../utils';

describe('GetPlantPart', () => {
  afterAll(async () => {
    server.close();
  });
  it('testing getPlantPart functionnality', async () => {
    const { token, fakeToken } = await getTokens();
    // with correct access token
    let plantPart = await getPlantPart(token);
    expect(!!plantPart.length).toBeTruthy();

    // with incorrect access token
    plantPart = await getPlantPart(fakeToken);
    expect(plantPart).toBeUndefined();
  });
});

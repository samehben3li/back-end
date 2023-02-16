import server from '../..';
import { getTokens, getPlantPart } from '../utils';

describe('GetPlantPart', () => {
  afterAll(async () => {
    server.close();
  });
  it('testing getPlantPart functionnality', async () => {
    const { userToken, fakeToken } = await getTokens();
    // with correct access token
    let plantPart = await getPlantPart(userToken);
    expect(!!plantPart.length).toBeTruthy();

    // with incorrect access token
    plantPart = await getPlantPart(fakeToken);
    expect(plantPart).toBeUndefined();
  });
});

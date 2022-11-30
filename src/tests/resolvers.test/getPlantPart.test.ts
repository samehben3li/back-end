import server from '../..';
import getPlantPart from '../utils/getPlantPart';
import getTokens from '../utils/getTokens';

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

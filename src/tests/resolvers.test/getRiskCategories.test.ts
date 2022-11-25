import server from '../..';
import getRiskCategories from '../utils/getRiskCategories';
import getTokens from '../utils/getTokens';

describe('GetRiskCategories', () => {
  afterAll(async () => {
    server.close();
  });
  it('testing getRiskCategories functionnality', async () => {
    const { token, fakeToken } = await getTokens();
    // with correct access token
    let riskCategories = await getRiskCategories(token);
    expect(!!riskCategories?.length).toBeTruthy();

    // with incorrect access token
    riskCategories = await getRiskCategories(fakeToken);
    expect(riskCategories).toBeUndefined();
  });
});

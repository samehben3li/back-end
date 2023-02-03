import server from '../../..';
import { newRiskCategory } from '../../data';
import { createRiskCategory, getTokens } from '../../utils';

describe('CRUD_RISKCATEGORY', () => {
  afterAll(async () => {
    server.close();
  });
  it('testing create risk category functionality', async () => {
    // get tokens
    const { fakeToken, userToken, adminToken } = await getTokens();

    // testing with incorrect access token
    let createRiskCategoryResponse = await createRiskCategory(
      fakeToken,
      newRiskCategory,
    );
    expect(createRiskCategoryResponse?.body?.data).toBeNull();
    expect(createRiskCategoryResponse?.body?.errors).toBeTruthy();

    // testing with user token
    createRiskCategoryResponse = await createRiskCategory(
      userToken,
      newRiskCategory,
    );
    expect(createRiskCategoryResponse?.body?.data).toBeNull();
    expect(createRiskCategoryResponse?.body?.errors).toBeTruthy();
    expect(createRiskCategoryResponse?.body?.errors[0]?.message).toBe(
      'NOT_AUTHORIZED',
    );

    // testing with admin token
    createRiskCategoryResponse = await createRiskCategory(
      adminToken,
      newRiskCategory,
    );
    expect(createRiskCategoryResponse?.body?.data).toBeTruthy();
    expect(createRiskCategoryResponse?.body?.errors).toBeUndefined();
    expect(
      createRiskCategoryResponse?.body?.data?.createRiskCategory,
    ).toContainKeys(['id', 'name', 'imgUrl', 'riskCategoryTypes']);
    expect(
      createRiskCategoryResponse?.body?.data?.createRiskCategory?.name,
    ).toBe(newRiskCategory.name);
    expect(
      createRiskCategoryResponse?.body?.data?.createRiskCategory?.imgUrl,
    ).toBe(newRiskCategory.imgUrl);
  });
});

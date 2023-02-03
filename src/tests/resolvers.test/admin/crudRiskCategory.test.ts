import server from '../../..';
import { awsCloudFront } from '../../../config';
import { newRiskCategory } from '../../data';
import { createRiskCategory, getTokens, updateRiskCategory } from '../../utils';

describe('CRUD_RISKCATEGORY', () => {
  afterAll(async () => {
    server.close();
  });

  let riskCategoryId: string;

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

    riskCategoryId =
      createRiskCategoryResponse?.body?.data?.createRiskCategory?.id;
  });

  it('testing update risk category functionality', async () => {
    // get tokens
    const { fakeToken, userToken, adminToken } = await getTokens();
    const name = 'TEST_UPDATE';
    const imgUrl = `${awsCloudFront}static.svg`;

    // testing with incorrect access token
    let updateRiskCategoryResponse = await updateRiskCategory(
      fakeToken,
      riskCategoryId,
      name,
      imgUrl,
    );
    expect(updateRiskCategoryResponse?.body?.data).toBeNull();
    expect(updateRiskCategoryResponse?.body?.errors).toBeTruthy();

    // testing with user token
    updateRiskCategoryResponse = await updateRiskCategory(
      userToken,
      riskCategoryId,
      name,
      imgUrl,
    );
    expect(updateRiskCategoryResponse?.body?.data).toBeNull();
    expect(updateRiskCategoryResponse?.body?.errors).toBeTruthy();
    expect(updateRiskCategoryResponse?.body?.errors[0]?.message).toBe(
      'NOT_AUTHORIZED',
    );

    // testing with admin token
    updateRiskCategoryResponse = await updateRiskCategory(
      adminToken,
      riskCategoryId,
      name,
      imgUrl,
    );
    expect(updateRiskCategoryResponse?.body?.data).toBeTruthy();
    expect(updateRiskCategoryResponse?.body?.errors).toBeUndefined();
    expect(
      updateRiskCategoryResponse?.body?.data?.updateRiskCategory,
    ).toContainKeys(['id', 'name', 'imgUrl', 'riskCategoryTypes']);
    expect(
      updateRiskCategoryResponse?.body?.data?.updateRiskCategory?.name,
    ).toBe(name);
    expect(
      updateRiskCategoryResponse?.body?.data?.updateRiskCategory?.imgUrl,
    ).toBe(imgUrl);
  });
});

import server from '../../..';
import { awsCloudFront } from '../../../config';
import { newRiskCategory, newType, updateTypeInfo } from '../../data';
import {
  addType,
  createRiskCategory,
  deleteType,
  getTokens,
  updateRiskCategory,
  updateType,
} from '../../utils';

describe('CRUD_RISKCATEGORY', () => {
  afterAll(async () => {
    server.close();
  });

  let riskCategoryId: string;
  let typeId: string;

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
  it('testing create risk category type functionality', async () => {
    // get tokens
    const { fakeToken, userToken, adminToken } = await getTokens();

    // testing with incorrect access token
    let addTypeResponse = await addType(fakeToken, riskCategoryId, newType);
    expect(addTypeResponse?.body?.data).toBeNull();
    expect(addTypeResponse?.body?.errors).toBeTruthy();

    // testing with user token
    addTypeResponse = await addType(userToken, riskCategoryId, newType);
    expect(addTypeResponse?.body?.data).toBeNull();
    expect(addTypeResponse?.body?.errors).toBeTruthy();
    expect(addTypeResponse?.body?.errors[0]?.message).toBe('NOT_AUTHORIZED');

    // testing with admin token
    addTypeResponse = await addType(adminToken, riskCategoryId, newType);
    expect(addTypeResponse?.body?.data).toBeTruthy();
    expect(addTypeResponse?.body?.errors).toBeUndefined();
    expect(addTypeResponse?.body?.data?.addRiskCategoryType).toContainKeys([
      'id',
      'name',
      'imgUrl',
    ]);
    expect(addTypeResponse?.body?.data?.addRiskCategoryType?.name).toBe(
      newType.name,
    );
    expect(addTypeResponse?.body?.data?.addRiskCategoryType?.imgUrl).toBe(
      newType.imgUrl,
    );
    typeId = addTypeResponse?.body?.data?.addRiskCategoryType?.id;
  });

  it('testing update risk category type functionality', async () => {
    // get tokens
    const { fakeToken, userToken, adminToken } = await getTokens();

    // testing with incorrect access token
    let updateTypeResponse = await updateType(
      fakeToken,
      riskCategoryId,
      typeId,
      updateTypeInfo,
    );
    expect(updateTypeResponse?.body?.data).toBeNull();
    expect(updateTypeResponse?.body?.errors).toBeTruthy();

    // testing with user token
    updateTypeResponse = await updateType(
      userToken,
      riskCategoryId,
      typeId,
      updateTypeInfo,
    );
    expect(updateTypeResponse?.body?.data).toBeNull();
    expect(updateTypeResponse?.body?.errors).toBeTruthy();
    expect(updateTypeResponse?.body?.errors[0]?.message).toBe('NOT_AUTHORIZED');

    // testing with admin token
    updateTypeResponse = await updateType(
      adminToken,
      riskCategoryId,
      typeId,
      updateTypeInfo,
    );
    expect(updateTypeResponse?.body?.data).toBeTruthy();
    expect(updateTypeResponse?.body?.errors).toBeUndefined();
    expect(
      updateTypeResponse?.body?.data?.updateRiskCategoryType,
    ).toContainKeys(['id', 'name', 'imgUrl']);
    expect(updateTypeResponse?.body?.data?.updateRiskCategoryType?.name).toBe(
      updateTypeInfo.name,
    );
    expect(updateTypeResponse?.body?.data?.updateRiskCategoryType?.imgUrl).toBe(
      updateTypeInfo.imgUrl,
    );
  });

  it('testing delete risk category type functionality', async () => {
    // get tokens
    const { fakeToken, userToken, adminToken } = await getTokens();

    // testing with incorrect access token
    let deleteTypeResponse = await deleteType(
      fakeToken,
      riskCategoryId,
      typeId,
    );
    expect(deleteTypeResponse?.body?.data).toBeNull();
    expect(deleteTypeResponse?.body?.errors).toBeTruthy();

    // testing with user token
    deleteTypeResponse = await deleteType(userToken, riskCategoryId, typeId);
    expect(deleteTypeResponse?.body?.data).toBeNull();
    expect(deleteTypeResponse?.body?.errors).toBeTruthy();
    expect(deleteTypeResponse?.body?.errors[0]?.message).toBe('NOT_AUTHORIZED');

    // testing with admin token
    deleteTypeResponse = await deleteType(adminToken, riskCategoryId, typeId);
    expect(deleteTypeResponse?.body?.data).toBeTruthy();
    expect(deleteTypeResponse?.body?.errors).toBeUndefined();
    expect(deleteTypeResponse?.body?.data?.deleteRiskCategoryType).toBe(
      'RISK_CATEGORY_TYPE_DELETED',
    );
  });
});

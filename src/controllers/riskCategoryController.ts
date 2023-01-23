import RiskCategory from '../model/input-options/RiskCategory';

export const addRiskCategoryType = async (
  id: string,
  name: string,
  imgUrl: string,
) => {
  const newRiskCategory = await RiskCategory.findByIdAndUpdate(
    id,
    {
      $push: {
        riskCategoryTypes: {
          name,
          imgUrl,
        },
      },
    },
    { new: true },
  );
  const indexOfRiskCategoryType =
    (newRiskCategory?.riskCategoryTypes?.length || 1) - 1;
  return newRiskCategory?.riskCategoryTypes[indexOfRiskCategoryType];
};

export const deleteRiskCategoryType = async (
  riskCategoryId: string,
  riskCategoryTypeId: string,
) => {
  await RiskCategory.findByIdAndUpdate(
    riskCategoryId,
    {
      $pull: {
        riskCategoryTypes: {
          _id: riskCategoryTypeId,
        },
      },
    },
    { safe: true, multi: true },
  );
  return 'RISK_CATEGORY_TYPE_DELETED';
};

export const updateRiskCategoryType = async (
  riskCategoryId: string,
  riskCategoryTypeId: string,
  name: string,
  imgUrl: string,
) => {
  const newRiskCategoryType = await RiskCategory.findOneAndUpdate(
    {
      _id: riskCategoryId,
      'riskCategoryTypes._id': riskCategoryTypeId,
    },
    {
      $set: {
        'riskCategoryTypes.$.name': name,
        'riskCategoryTypes.$.imgUrl': imgUrl,
      },
    },
    {
      new: true,
    },
  );
  return newRiskCategoryType?.riskCategoryTypes?.find(
    riskCategoryType => riskCategoryType?.id === riskCategoryTypeId,
  );
};

import RiskCategory from '../model/input-options/RiskCategory';

const updateRiskCategoryType = async (
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

export default updateRiskCategoryType;

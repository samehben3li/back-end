import RiskCategory from '../model/input-options/RiskCategory';

const addRiskCategoryType = async (
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

export default addRiskCategoryType;

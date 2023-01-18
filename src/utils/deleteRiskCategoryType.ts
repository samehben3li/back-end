import RiskCategory from '../model/input-options/RiskCategory';

const deleteRiskCategoryType = async (
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

export default deleteRiskCategoryType;

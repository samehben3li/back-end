import RiskCategory from '../model/input-options/RiskCategory';

export const addRiskCategoryType = async (
  id: string,
  name: string,
  imgUrl: string,
) => {
  try {
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
    if (!newRiskCategory) {
      throw new Error('RISK_CATEGORY_NOT_FOUND');
    }
    const indexOfRiskCategoryType =
      newRiskCategory.riskCategoryTypes.length - 1;
    return newRiskCategory.riskCategoryTypes[indexOfRiskCategoryType];
  } catch (err) {
    return err;
  }
};

export const deleteRiskCategoryType = async (
  riskCategoryId: string,
  riskCategoryTypeId: string,
) => {
  try {
    const riskCategory = await RiskCategory.findByIdAndUpdate(
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
    if (!riskCategory) {
      throw new Error('RISK_CATEGORY_NOT_FOUND');
    }
    if (
      !riskCategory.riskCategoryTypes.find(
        riskCategoryType => riskCategoryType.id === riskCategoryTypeId,
      )
    ) {
      throw new Error('RISK_CATEGORY_TYPE_NOT_FOUND');
    }
    return 'RISK_CATEGORY_TYPE_DELETED';
  } catch (err) {
    return err;
  }
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

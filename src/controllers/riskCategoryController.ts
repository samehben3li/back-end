import { IInputOptions } from '../interfaces';
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

const optionOfDeleteType = (riskCategoryTypeId: string) => {
  const deleteQuery = {
    $pull: {
      riskCategoryTypes: {
        _id: riskCategoryTypeId,
      },
    },
  };
  const options = { safe: true, multi: true };
  return { deleteQuery, options };
};

export const deleteRiskCategoryType = async (
  riskCategoryId: string,
  riskCategoryTypeId: string,
) => {
  const { deleteQuery, options } = optionOfDeleteType(riskCategoryTypeId);
  return RiskCategory.findByIdAndUpdate(riskCategoryId, deleteQuery, options)
    .then(riskCategory => {
      if (!riskCategory) throw new Error('RISK_CATEGORY_NOT_FOUND');
      return riskCategory.riskCategoryTypes.find(
        riskCategoryType => riskCategoryType.id === riskCategoryTypeId,
      );
    })
    .then(riskCategoryType => {
      if (!riskCategoryType) throw new Error('RISK_CATEGORY_TYPE_NOT_FOUND');
      return 'RISK_CATEGORY_TYPE_DELETED';
    })
    .catch(err => err);
};

const optionsOfUpdateType = (
  riskCategoryId: string,
  riskCategoryTypeId: string,
  { name, imgUrl }: IInputOptions,
) => {
  const query = {
    _id: riskCategoryId,
    'riskCategoryTypes._id': riskCategoryTypeId,
  };
  const update = {
    $set: {
      'riskCategoryTypes.$.name': name,
      'riskCategoryTypes.$.imgUrl': imgUrl,
    },
  };
  const options = { new: true, multi: false, runValidators: true };
  return { query, update, options };
};

export const updateRiskCategoryType = (
  riskCategoryId: string,
  riskCategoryTypeId: string,
  riskCategoryType: IInputOptions,
) => {
  const { query, update, options } = optionsOfUpdateType(
    riskCategoryId,
    riskCategoryTypeId,
    riskCategoryType,
  );
  return RiskCategory.findOneAndUpdate(query, update, options)
    .then(riskCategory => {
      if (!riskCategory) throw new Error('RISK_CATEGORY_NOT_FOUND');
      return riskCategory.riskCategoryTypes.find(
        rct => rct.id === riskCategoryTypeId,
      );
    })
    .catch(err => err);
};

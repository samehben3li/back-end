import { crudRiskCategoryType } from '../utils';
import { IInputOptions } from '../interfaces';

const optionsOfCreate = (
  riskCategoryId: string,
  name: string,
  imgUrl: string,
) => {
  const query = {
    _id: riskCategoryId,
  };
  const modification = {
    $push: {
      riskCategoryTypes: {
        name,
        imgUrl,
      },
    },
  };
  const options = { new: true };
  return { query, modification, options };
};

export const addRiskCategoryType = async (
  id: string,
  name: string,
  imgUrl: string,
) => {
  const { query, modification, options } = optionsOfCreate(id, name, imgUrl);
  return crudRiskCategoryType(query, modification, options)
    .then(riskCategoryTypes => {
      const indexOfRiskCategoryType = riskCategoryTypes.length - 1;
      return riskCategoryTypes[indexOfRiskCategoryType];
    })
    .catch(err => err);
};

const optionsOfDelete = (
  riskCategoryId: string,
  riskCategoryTypeId: string,
) => {
  const query = {
    _id: riskCategoryId,
  };
  const modification = {
    $pull: {
      riskCategoryTypes: {
        _id: riskCategoryTypeId,
      },
    },
  };
  const options = { safe: true, multi: true };
  return { query, modification, options };
};

export const deleteRiskCategoryType = async (
  riskCategoryId: string,
  riskCategoryTypeId: string,
) => {
  const { query, modification, options } = optionsOfDelete(
    riskCategoryId,
    riskCategoryTypeId,
  );
  return crudRiskCategoryType(query, modification, options)
    .then(riskCategoryTypes =>
      riskCategoryTypes.find(type => type.id === riskCategoryTypeId),
    )
    .then(riskCategoryType => {
      if (!riskCategoryType) {
        throw new Error('RISK_CATEGORY_TYPE_NOT_FOUND');
      }
      return 'RISK_CATEGORY_TYPE_DELETED';
    })
    .catch(err => err);
};

const optionsOfUpdate = (
  riskCategoryId: string,
  riskCategoryTypeId: string,
  { name, imgUrl }: IInputOptions,
) => {
  const query = {
    _id: riskCategoryId,
    'riskCategoryTypes._id': riskCategoryTypeId,
  };
  const modification = {
    $set: {
      'riskCategoryTypes.$.name': name,
      'riskCategoryTypes.$.imgUrl': imgUrl,
    },
  };
  const options = { new: true, multi: false, runValidators: true };
  return { query, modification, options };
};

export const updateRiskCategoryType = (
  riskCategoryId: string,
  riskCategoryTypeId: string,
  riskCategoryType: IInputOptions,
) => {
  const { query, modification, options } = optionsOfUpdate(
    riskCategoryId,
    riskCategoryTypeId,
    riskCategoryType,
  );
  return crudRiskCategoryType(query, modification, options)
    .then(riskCategoryTypes =>
      riskCategoryTypes.find(type => type.id === riskCategoryTypeId),
    )
    .catch(err => err);
};

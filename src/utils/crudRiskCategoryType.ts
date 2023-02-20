import { RiskCategory } from '../model';

interface IQueryDelete {
  _id: string;
}

interface IQueryUpdate {
  _id: string;
  'riskCategoryTypes._id': string;
}

interface IModificationCreate {
  $push: {
    riskCategoryTypes: {
      name: string;
      imgUrl: string;
    };
  };
}

interface IModificationUpdate {
  $set: {
    'riskCategoryTypes.$.name': string;
    'riskCategoryTypes.$.imgUrl': string;
  };
}

interface IModificationDelete {
  $pull: {
    riskCategoryTypes: {
      _id: string;
    };
  };
}

interface IOptions {
  new?: boolean;
  multi?: boolean;
  runValidators?: boolean;
  safe?: boolean;
}

const crudRiskCategoryType = (
  query: IQueryUpdate | IQueryDelete,
  modification: IModificationUpdate | IModificationDelete | IModificationCreate,
  options: IOptions,
) =>
  RiskCategory.findOneAndUpdate(query, modification, options).then(
    riskCategory => {
      if (!riskCategory) {
        throw new Error('RISK_CATEGORY_NOT_FOUND');
      }
      return riskCategory.riskCategoryTypes;
    },
  );

export default crudRiskCategoryType;

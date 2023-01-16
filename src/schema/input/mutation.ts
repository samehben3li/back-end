import { IResolvers } from '@graphql-tools/utils';
import { RiskCategory } from '../../model';
import generateUploadURL from '../../s3';
import { authenticated, authorization } from '../../utils';

const inputMutation: IResolvers = {
  createRiskCategory: async (
    _parent,
    { name, imgUrl, riskCategoryTypes },
    context,
  ) => {
    const { isAdmin } = authenticated(
      context.req.headers.authorization?.split(' ').pop().trim(),
    );
    authorization(isAdmin);
    const newRiskCategory = await RiskCategory.create({
      name,
      imgUrl,
      riskCategoryTypes,
    });
    return newRiskCategory;
  },

  deleteRiskCategory: async (_parent, { id }, context) => {
    const { isAdmin } = authenticated(
      context.req.headers.authorization?.split(' ').pop().trim(),
    );
    authorization(isAdmin);
    await RiskCategory.findByIdAndDelete(id);
    return 'RISK_CATEGORY_DELETED';
  },

  updateRiskCategory: async (_parent, { id, name, imgUrl }, context) => {
    const { isAdmin } = authenticated(
      context.req.headers.authorization?.split(' ').pop().trim(),
    );
    authorization(isAdmin);
    const updatedRiskCategory = await RiskCategory.findByIdAndUpdate(
      id,
      {
        name,
        imgUrl,
      },
      { new: true },
    );
    return updatedRiskCategory;
  },

  addRiskCategoryType: async (_parent, { id, name, imgUrl }, context) => {
    const { isAdmin } = authenticated(
      context.req.headers.authorization?.split(' ').pop().trim(),
    );
    authorization(isAdmin);
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
  },

  deleteRiskCategoryType: async (
    _parent,
    { riskCategoryId, riskCategoryTypeId },
    context,
  ) => {
    const { isAdmin } = authenticated(
      context.req.headers.authorization?.split(' ').pop().trim(),
    );
    authorization(isAdmin);
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
  },

  updateRiskCategoryType: async (
    _parent,
    { riskCategoryId, riskCategoryTypeId, name, imgUrl },
    context,
  ) => {
    const { isAdmin } = authenticated(
      context.req.headers.authorization?.split(' ').pop().trim(),
    );
    authorization(isAdmin);
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
  },

  getUploadURL: async (_parent, { imgName }, context) => {
    const { isAdmin } = authenticated(
      context.req.headers.authorization?.split(' ').pop().trim(),
    );
    authorization(isAdmin);
    const uploadURL = await generateUploadURL(imgName);
    return uploadURL;
  },
};

export default inputMutation;

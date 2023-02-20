import { IResolvers } from '@graphql-tools/utils';
import {
  addRiskCategoryType,
  deleteRiskCategoryType,
  updateRiskCategoryType,
} from '../../controllers';
import { RiskCategory } from '../../model';
import generateUploadURL from '../../s3';
import { adminPermission, deleteData } from '../../utils';

const inputMutation: IResolvers = {
  createRiskCategory: async (
    _parent,
    { name, imgUrl, riskCategoryTypes },
    context,
  ) =>
    adminPermission(
      context.req.headers.authorization?.split(' ').pop().trim(),
      () =>
        RiskCategory.create({
          name,
          imgUrl,
          riskCategoryTypes,
        }).then(riskCategory => riskCategory),
    ),
  deleteRiskCategory: (_parent, { id }, context) =>
    deleteData(context, RiskCategory, id),
  updateRiskCategory: async (_parent, { id, name, imgUrl }, context) =>
    adminPermission(
      context.req.headers.authorization?.split(' ').pop().trim(),
      () =>
        RiskCategory.findByIdAndUpdate(
          id,
          {
            name,
            imgUrl,
          },
          { new: true, multi: false, runValidators: true },
        ).then(riskCategory => riskCategory),
    ),
  addRiskCategoryType: async (_parent, { id, name, imgUrl }, context) =>
    adminPermission(
      context.req.headers.authorization?.split(' ').pop().trim(),
      () => addRiskCategoryType(id, name, imgUrl),
    ),
  deleteRiskCategoryType: async (
    _parent,
    { riskCategoryId, riskCategoryTypeId },
    context,
  ) =>
    adminPermission(
      context.req.headers.authorization?.split(' ').pop().trim(),
      () => deleteRiskCategoryType(riskCategoryId, riskCategoryTypeId),
    ),
  updateRiskCategoryType: async (
    _parent,
    { riskCategoryId, riskCategoryTypeId, riskCategoryType },
    context,
  ) =>
    adminPermission(
      context.req.headers.authorization?.split(' ').pop().trim(),
      () =>
        updateRiskCategoryType(
          riskCategoryId,
          riskCategoryTypeId,
          riskCategoryType,
        ),
    ),
  getUploadURL: async (_parent, { imgName }, context) =>
    adminPermission(
      context.req.headers.authorization?.split(' ').pop().trim(),
      () => generateUploadURL(imgName).then(uploadURL => uploadURL),
    ),
};

export default inputMutation;

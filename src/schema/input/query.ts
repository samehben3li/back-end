import { IResolvers } from '@graphql-tools/utils';
import { RiskCategory, PlantPart } from '../../model';
import { adminPermission, getInputContent } from '../../utils';

const inputQuery: IResolvers = {
  getRiskCategories: (_parent, _args, context) =>
    getInputContent(
      context.req.headers.authorization?.split(' ').pop().trim(),
      () => RiskCategory.find().then(rcs => rcs),
    ),

  getPlantPart: (_parent, _args, context) =>
    getInputContent(
      context.req.headers.authorization?.split(' ').pop().trim(),
      () => PlantPart.find().then(pps => pps),
    ),
  getRiskCategory: async (_parent, { id }, context) =>
    adminPermission(
      context.req.headers.authorization?.split(' ').pop().trim(),
      () => RiskCategory.findById(id).then(riskCategory => riskCategory),
    ),
};

export default inputQuery;

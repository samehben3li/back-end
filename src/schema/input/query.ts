import { IResolvers } from '@graphql-tools/utils';
import PlantPart from '../../model/input-options/PlantPart';
import RiskCategory from '../../model/input-options/RiskCategory';
import { authenticated, authorization, getInputContent } from '../../utils';

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

  getRiskCategory: async (_parent, { id }, context) => {
    const { isAdmin } = authenticated(
      context.req.headers.authorization?.split(' ').pop().trim(),
    );
    authorization(isAdmin);
    return RiskCategory.findById(id).then(riskCategory => riskCategory);
  },
};

export default inputQuery;

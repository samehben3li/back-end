import { IResolvers } from '@graphql-tools/utils';
import { Flag } from '../../model';
import { authenticated } from '../../utils';

const flagMutation: IResolvers = {
  addFlag: async (_parent, args, context) => {
    const { riskCategory, riskCategoryType, plantPart, location } = args;
    const token = context.req.headers.authorization?.split(' ').pop().trim();
    const { userId } = authenticated(token);
    const flag = await Flag.create({
      userId,
      riskCategory,
      riskCategoryType,
      plantPart,
      location,
    });
    return flag;
  },
};

export default flagMutation;

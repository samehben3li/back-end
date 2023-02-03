import { IInputOptions } from '../../interfaces';

const updateTypeMutation = (
  riskCategoryId: string,
  riskCategoryTypeId: string,
  { name, imgUrl }: IInputOptions,
) => ({
  query: `
    mutation Mutation($riskCategoryId: ID!, $riskCategoryTypeId: ID!, $riskCategoryType: InputOption) {
        updateRiskCategoryType(riskCategoryId: $riskCategoryId, riskCategoryTypeId: $riskCategoryTypeId, riskCategoryType: $riskCategoryType) {
            id
            imgUrl
            name
        }
    }
      `,
  variables: {
    riskCategoryId,
    riskCategoryTypeId,
    riskCategoryType: {
      name,
      imgUrl,
    },
  },
});

export default updateTypeMutation;

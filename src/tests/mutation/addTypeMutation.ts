import { IInputOptions } from '../../interfaces';

const addTypeMutation = (
  riskCategoryId: string,
  { name, imgUrl }: IInputOptions,
) => ({
  query: `
    mutation Mutation($riskCategoryId: ID!, $name: String!, $imgUrl: String!) {
        addRiskCategoryType(id: $riskCategoryId, name: $name, imgUrl: $imgUrl) {
            id
            imgUrl
            name
        }
    }
    `,
  variables: {
    riskCategoryId,
    name,
    imgUrl,
  },
});

export default addTypeMutation;

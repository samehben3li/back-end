import { IRiskCategory } from '../../interfaces';

const createRiskCategoryMutation = (riskCategory: IRiskCategory) => ({
  query: `
    mutation Mutation($name: String!, $imgUrl: String!, $riskCategoryTypes: [InputOption!]!) {
        createRiskCategory(name: $name, imgUrl: $imgUrl, riskCategoryTypes: $riskCategoryTypes) {
            id
            imgUrl
            name
            riskCategoryTypes {
                id
                imgUrl
                name
            }
        }
    }
    `,
  variables: riskCategory,
});

export default createRiskCategoryMutation;

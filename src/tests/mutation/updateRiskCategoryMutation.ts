const updateRiskCategoryMutation = (
  updateRiskCategoryId: string,
  name: string,
  imgUrl: string,
) => ({
  query: `
    mutation Mutation($updateRiskCategoryId: ID!, $name: String, $imgUrl: String) {
        updateRiskCategory(id: $updateRiskCategoryId, name: $name, imgUrl: $imgUrl) {
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
  variables: {
    updateRiskCategoryId,
    name,
    imgUrl,
  },
});

export default updateRiskCategoryMutation;

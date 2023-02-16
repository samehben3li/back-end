const deleteTypeMutation = (
  riskCategoryId: string,
  riskCategoryTypeId: string,
) => ({
  query: `
    mutation Mutation($riskCategoryId: ID!, $riskCategoryTypeId: ID!) {
        deleteRiskCategoryType(riskCategoryId: $riskCategoryId, riskCategoryTypeId: $riskCategoryTypeId)
    }
    `,
  variables: { riskCategoryId, riskCategoryTypeId },
});

export default deleteTypeMutation;

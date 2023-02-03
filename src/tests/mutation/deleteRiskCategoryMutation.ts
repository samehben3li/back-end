const deleteRiskCategoryMutation = (riskCategoryId: string) => ({
  query: `
  mutation Mutation($riskCategoryId: ID!) {
    deleteRiskCategory(id: $riskCategoryId)
  }
`,
  variables: { riskCategoryId },
});

export default deleteRiskCategoryMutation;

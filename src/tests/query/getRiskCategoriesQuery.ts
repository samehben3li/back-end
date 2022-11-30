const getRiskCategoriesQuery = {
  query: `
query GetRiskCategories {
  getRiskCategories {
    id
    imgUrl
    name
    riskCategoryTypes {
      id
      imgUrl
      name
    }
  }
}`,
};

export default getRiskCategoriesQuery;

const getRiskCategories = {
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

export default getRiskCategories;

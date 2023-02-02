const getAllFlagsQuery = {
  query: ` 
  query Query {
    getAllFlags {
      createdAt
      id
      location {
        left
        right
      }
      plantPart {
        name
        imgUrl
      }
      riskCategory {
        name
        imgUrl
      }
      riskCategoryType {
        name
        imgUrl
      }
      userId
    }
  }
  `,
};

export default getAllFlagsQuery;

const getAllFlagsQuery = {
  query: `
      query Query {
        getAllFlags {
          userId
          id
          createdAt
          riskCategoryType {
            name
            imgUrl
          }
          riskCategory {
            name
            imgUrl
          }
          location {
            left
            right
          }
          plantPart {
            name
            imgUrl
          }
        }
      }
      `,
};

export default getAllFlagsQuery;

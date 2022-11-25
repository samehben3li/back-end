const getFlagsQuery = {
  query: `
    query Query {
      getFlags {
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

export default getFlagsQuery;

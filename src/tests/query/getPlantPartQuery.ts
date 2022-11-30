const getPlantPartQuery = {
  query: `
    query GetPlantPart {
        getPlantPart {
          id
          imgUrl
          name
        }
    }`,
};

export default getPlantPartQuery;

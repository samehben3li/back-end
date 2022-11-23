const getPlantPart = {
  query: `
    query GetPlantPart {
        getPlantPart {
          id
          imgUrl
          name
        }
    }`,
};

export default getPlantPart;

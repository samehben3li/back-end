import { IFlag } from '../../interfaces';

const addFlagMutation = (flag: IFlag) => ({
  query: `
  mutation AddFlag (
    $riskCategory: InputOption!
    $riskCategoryType: InputOption!
    $plantPart: InputOption!
    $location: LocationInput
  ) {
    addFlag(
      riskCategory: $riskCategory
      riskCategoryType: $riskCategoryType
      plantPart: $plantPart
      location: $location
    ) {
      id
      createdAt
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
  variables: flag,
});

export default addFlagMutation;

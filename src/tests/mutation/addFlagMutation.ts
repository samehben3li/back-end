import { IFlag } from '../interfaces';

const addFlagMutation = (flag: IFlag) => ({
  query: `
  mutation Mutaion (
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
    }
  }
`,
  variables: flag,
});

export default addFlagMutation;

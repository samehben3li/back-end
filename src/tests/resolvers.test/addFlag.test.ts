import server from '../..';
import { IFlag } from '../interfaces';
import addFlag from '../utils/addFlag';
import getPlantPart from '../utils/getPlantPart';
import getRiskCategories from '../utils/getRiskCategories';
import getTokens from '../utils/getTokens';

describe('AddFlag', () => {
  afterAll(async () => {
    server.close();
  });
  it('testing addFlag functionnality', async () => {
    const { token } = await getTokens();
    const riskCategories = await getRiskCategories(token);
    const plantParts = await getPlantPart(token);
    const fakeLocation = {
      left: ['TOP', 'BOTTOM'],
      right: ['MIDDLE'],
    };

    riskCategories?.forEach(riskCategory => {
      riskCategory.riskCategoryTypes?.forEach(riskCategoryType => {
        plantParts?.forEach(async plantPart => {
          const flag: IFlag = {
            riskCategory: {
              name: riskCategory.name,
              imgUrl: riskCategory.imgUrl,
            },
            riskCategoryType: {
              name: riskCategoryType.name,
              imgUrl: riskCategoryType.imgUrl,
            },
            plantPart: {
              name: plantPart.name,
              imgUrl: plantPart.imgUrl,
            },
            location: fakeLocation,
          };
          const newFlag = await addFlag(token, flag);
          console.log(newFlag);
        });
      });
    });
  });
});

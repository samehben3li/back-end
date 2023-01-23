export interface IUserInfo {
  email: string;
  password: string;
}

export interface IInputOptions {
  id?: string;
  imgUrl: string;
  name: string;
}

export interface IRiskCategory extends IInputOptions {
  riskCategoryTypes: Array<IInputOptions>;
}

interface ILocation {
  left: string[];
  right: string[];
}

export interface IFlag {
  riskCategory: IInputOptions;
  riskCategoryType: IInputOptions;
  plantPart: IInputOptions;
  location: ILocation;
}

export interface IUserInfo {
  email: string;
  password: string;
}

export interface IInputOptions {
  id: string;
  imgUrl: string;
  name: string;
}

export interface IRiskCategory extends IInputOptions {
  riskCategoryTypes: Array<IInputOptions>;
}

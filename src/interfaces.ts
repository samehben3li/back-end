export interface IUserInfo {
  email: string;
  password: string;
  username?: string;
}

export interface IInputOptions {
  id?: string;
  imgUrl: string;
  name: string;
}

export interface IRiskCategory extends IInputOptions {
  riskCategoryTypes: Array<IInputOptions>;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

interface ILocation {
  left: string[];
  right: string[];
}

export interface IFlag {
  id?: string;
  userId?: string;
  riskCategory: IInputOptions;
  riskCategoryType: IInputOptions;
  plantPart: IInputOptions;
  location: ILocation;
}

export interface IContext {
  req: {
    headers: {
      authorization: string;
    };
  };
}

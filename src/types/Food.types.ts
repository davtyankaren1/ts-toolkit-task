export interface IFood {
  id: string;
  name: string;
  price: string;
  country: string;
}

export enum ApiStatus {
  'loading',
  'ideal',
  'success',
  'error',
}

export interface IfoodsState {
  foods: IFood[];
  postFoodStatus: ApiStatus;
  createFoodStatus: ApiStatus;
  deleteFoodsStatus: ApiStatus;
  updateFoodStatus: ApiStatus;
}

export interface IFoodForm {
  name: string;
  price: number | string;
  country: string;
}

export interface IUpdateUser {
  id: number;
  data: IFoodForm;
}

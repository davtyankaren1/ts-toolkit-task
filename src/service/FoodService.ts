import httpService from './HttpService';
import ApiConfig from './ApiConfig';
import { IFood, IFoodForm } from '../types/Food.types';

export const GetFoodsListApi = async () => {
  return await httpService.axiosExport.getallfoods<IFood[]>(ApiConfig.foods);
};

export const CreateFoodApi = async (data: IFoodForm) => {
  return await httpService.axiosExport.postfood<IFood[]>(ApiConfig.foods, data);
};

export const DeleteFoodApi = async (id: number) => {
  return await httpService.axiosExport.deletefood<IFood[]>(`${ApiConfig.foods}/${id}`);
};

export const UpdateFoodApi = async (id: number, data: IFoodForm) => {
  const url = `${ApiConfig.foods}/${id}`;
  return await httpService.axiosExport.putfood(url, data);
};

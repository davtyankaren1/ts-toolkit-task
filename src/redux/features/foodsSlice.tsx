import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiStatus, IFoodForm, IfoodsState, IUpdateUser } from '../../types/Food.types';
import {
  CreateFoodApi,
  DeleteFoodApi,
  GetFoodsListApi,
  UpdateFoodApi,
} from '../../service/FoodService';

const initialState: IfoodsState = {
  foods: [],
  postFoodStatus: ApiStatus.ideal,
  createFoodStatus: ApiStatus.ideal,
  deleteFoodsStatus: ApiStatus.ideal,
  updateFoodStatus: ApiStatus.ideal,
};

export const GetFoods = createAsyncThunk('foods/GetFoods', async () => {
  const { data } = await GetFoodsListApi();
  return data;
});

export const RemoveFood = createAsyncThunk('foods/RemoveFood', async (id: number) => {
  const { data } = await DeleteFoodApi(id);
  return data;
});

export const PostFood = createAsyncThunk('foods/PostFood', async (data: IFoodForm) => {
  const res = await CreateFoodApi(data);
  const newdata = res.data;
  return newdata;
});

export const UpdateFood = createAsyncThunk(
  'foods/UpdateUser',
  async ({ id, data }: IUpdateUser) => {
    const res = await UpdateFoodApi(id, data);
    const newData = res.data;
    return newData;
  },
);

const foodSlice = createSlice({
  name: 'foods',
  initialState,
  reducers: {
    resetCreateFoodStatus: (state) => {
      state.createFoodStatus === ApiStatus.ideal;
    },
  },
  extraReducers: (bulder) => {
    bulder
      .addCase(RemoveFood.pending, (state) => {
        state.deleteFoodsStatus = ApiStatus.loading;
      })
      .addCase(RemoveFood.fulfilled, (state) => {
        state.deleteFoodsStatus = ApiStatus.ideal;
      })
      .addCase(RemoveFood.rejected, (state) => {
        state.deleteFoodsStatus = ApiStatus.error;
      })

      .addCase(GetFoods.pending, (state) => {
        state.postFoodStatus = ApiStatus.loading;
      })
      .addCase(GetFoods.fulfilled, (state, action) => {
        state.postFoodStatus = ApiStatus.ideal;
        state.foods = action.payload;
      })
      .addCase(GetFoods.rejected, (state) => {
        state.postFoodStatus = ApiStatus.error;
      })

      .addCase(PostFood.pending, (state) => {
        state.createFoodStatus = ApiStatus.loading;
      })
      .addCase(PostFood.fulfilled, (state) => {
        state.createFoodStatus = ApiStatus.success;
      })
      .addCase(PostFood.rejected, (state) => {
        state.createFoodStatus = ApiStatus.error;
      })

      .addCase(UpdateFood.pending, (state) => {
        state.updateFoodStatus = ApiStatus.loading;
      })
      .addCase(UpdateFood.fulfilled, (state) => {
        state.updateFoodStatus = ApiStatus.success;
      })
      .addCase(UpdateFood.rejected, (state) => {
        state.updateFoodStatus = ApiStatus.error;
      });
  },
});

export const { resetCreateFoodStatus } = foodSlice.actions;
export default foodSlice.reducer;

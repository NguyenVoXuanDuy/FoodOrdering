import SizeEnum from "@/enums/SizeEnum";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { randomUUID } from "expo-crypto";

export type CreateProduct = {
  id: string | null;
  image: string | null;
  name: string;
  price: { [key in SizeEnum]: string };
  calories: string;
  fat: string;
  protein: string;
  carbs: string;
  ingredients: string[];
};
type createProductSliceType = {
  product: CreateProduct;
};

export const createProductSlice = createSlice({
  name: "create-product",
  initialState: {
    product: {
      id: null,
      image: null,
      name: "",
      price: {
        [SizeEnum.SMALL]: "",
        [SizeEnum.MEDIUM]: "",
        [SizeEnum.LARGE]: "",
      },
      calories: "",
      fat: "",
      protein: "",
      carbs: "",
      ingredients: [],
    },
  } as createProductSliceType,
  reducers: {
    productChange: (state, action: PayloadAction<CreateProduct>) => {
      state.product = action.payload;
    },
  },
});

export const { productChange } = createProductSlice.actions;

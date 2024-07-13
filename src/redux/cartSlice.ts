import SizeEnum from "@/enums/SizeEnum";
import { CartDetail, Product } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { randomUUID } from "expo-crypto";
type CartType = {
  cartDetails: CartDetail[];
  totalPrice: number;
};

type CreateCartPayloadType = {
  product: Product;
  size: SizeEnum;
  quantity: number;
};

type UpdateAndRemoveCartPayloadType = {
  product: Product;
  size: SizeEnum;
};
export const cartSlice = createSlice({
  name: "cart",

  initialState: {
    cartDetails: [],
    totalPrice: 0,
  } as CartType,

  reducers: {
    addToCart: (state, action: PayloadAction<CreateCartPayloadType>) => {
      const existingCartDetail = state.cartDetails.find(
        (cartDetail) =>
          cartDetail.product.id === action.payload.product.id &&
          cartDetail.size === action.payload.size
      );
      if (existingCartDetail) {
        existingCartDetail.quantity += action.payload.quantity;
      } else {
        state.cartDetails.push({
          id: randomUUID(),
          product: action.payload.product,
          size: action.payload.size,
          quantity: action.payload.quantity,
        });
      }
      state.totalPrice +=
        action.payload.product.price[action.payload.size] *
        action.payload.quantity;
    },
    removeCart: (state) => {
      state.cartDetails = [];
      state.totalPrice = 0;
    },
    removeFromCart: (
      state,
      action: PayloadAction<UpdateAndRemoveCartPayloadType>
    ) => {
      const cartDetail = state.cartDetails.find(
        (cartDetail) =>
          cartDetail.product.id === action.payload.product.id &&
          cartDetail.size === action.payload.size
      );
      if (!cartDetail) {
        return;
      }
      state.totalPrice -=
        cartDetail.product.price[action.payload.size] * cartDetail.quantity;
      state.cartDetails = state.cartDetails.filter(
        (cartDetail) =>
          cartDetail.product.id !== action.payload.product.id ||
          cartDetail.size !== action.payload.size
      );
    },

    incrementQuantity: (
      state,
      action: PayloadAction<UpdateAndRemoveCartPayloadType>
    ) => {
      const cartDetail = state.cartDetails.find(
        (cartDetail) =>
          cartDetail.product.id === action.payload.product.id &&
          cartDetail.size === action.payload.size
      );
      if (!cartDetail) {
        return;
      }
      state.totalPrice += cartDetail.product.price[action.payload.size];
      cartDetail.quantity += 1;
    },

    decrementQuantity: (
      state,
      action: PayloadAction<UpdateAndRemoveCartPayloadType>
    ) => {
      const cartDetail = state.cartDetails.find(
        (cartDetail) =>
          cartDetail.product.id === action.payload.product.id &&
          cartDetail.size === action.payload.size
      );
      if (!cartDetail) {
        return;
      }
      if (cartDetail.quantity === 1) {
        state.totalPrice -= cartDetail.product.price[action.payload.size];
        state.cartDetails = state.cartDetails.filter(
          (cartDetail) =>
            cartDetail.product.id !== action.payload.product.id ||
            cartDetail.size !== action.payload.size
        );
        return;
      } else {
        state.totalPrice -= cartDetail.product.price[action.payload.size];
        cartDetail.quantity -= 1;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  removeCart,
} = cartSlice.actions;

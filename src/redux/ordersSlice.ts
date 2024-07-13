import { db } from "@/firebase/firebaseConfig";
import { saveOrderToFirebase } from "@/firebase/firebaseService";
import { Order, OrderStatus } from "@/types/type";
import useAuth from "@/util/useAuth";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { remove, set } from "firebase/database";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export const makeOrder = createAsyncThunk(
  "orders/makeOrder",
  async (order: Order, thunkAPI) => {
    try {
      await saveOrderToFirebase(order);
      return order;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const ordersSlice = createSlice({
  name: "orders",

  initialState: {
    orders: [],
    isMakingOrderLoading: false,
    isFetchingLoading: false,
  } as {
    orders: Order[];
    isMakingOrderLoading: boolean;
    isFetchingLoading: boolean;
  },

  reducers: {
    removeOrders: (state) => {
      state.orders = [];
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders = [action.payload, ...state.orders];
    },
    changeOrderStatus: (
      state,
      action: PayloadAction<{ id: string; status: OrderStatus }>
    ) => {
      const order = state.orders.find(
        (order) => order.id === action.payload.id
      );
      if (order) {
        order.status = action.payload.status;
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(makeOrder.pending, (state) => {
      state.isMakingOrderLoading = true;
    });
    builder.addCase(makeOrder.fulfilled, (state, action) => {
      state.isMakingOrderLoading = false;
    });
    builder.addCase(makeOrder.rejected, (state) => {
      state.isMakingOrderLoading = false;
    });
  },
});

export const { addOrder, changeOrderStatus, removeOrders } =
  ordersSlice.actions;

import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "@/redux/cartSlice";
// import { authSlice } from "@/redux/authSlice";
import { createProductSlice } from "@/redux/createProductSlice";
import { authSlice } from "@/redux/authSlice";
import { productsSlice } from "@/redux/productsSlice";
import { ordersSlice } from "@/redux/ordersSlice";
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    createProduct: createProductSlice.reducer,
    auth: authSlice.reducer,
    products: productsSlice.reducer,
    orders: ordersSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

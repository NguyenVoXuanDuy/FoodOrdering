//import { Database } from "./database.types";

import SizeEnum from "@/enums/SizeEnum";

// export type Tables<T extends keyof Database["public"]["Tables"]> =
//   Database["public"]["Tables"][T]["Row"];

// export type InsertTables<T extends keyof Database["public"]["Tables"]> =
//   Database["public"]["Tables"][T]["Insert"];

// export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
//   Database["public"]["Tables"][T]["Update"];

// export type Enums<T extends keyof Database["public"]["Enums"]> =
//   Database["public"]["Enums"][T];

export type User = {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
};

export type Product = {
  id: string;
  image: string | null | undefined;
  name: string;
  price: { [key in SizeEnum]: number };
  calories: number;
  fat: number;
  protein: number;
  carbs: number;
  ingredients: string[];
  createdAt: string;
  updatedAt: string;
};

export type PizzaSize = "S" | "M" | "L" | "XL";

export type CartDetail = {
  id: string;
  product: Product;
  size: SizeEnum;
  quantity: number;
};

export const OrderStatusList: OrderStatus[] = [
  "Preparing",
  "Delivering",
  "Fulfilled",
];

export type OrderStatus = "Preparing" | "Delivering" | "Fulfilled";

export type Order = {
  id: string;
  subTotal: number;
  deliveryFee: number;
  totalPrice: number;
  userId: string;
  status: OrderStatus;
  orderDetails: OrderDetail[];
  address: string;
  createdAt: string;
  updatedAt: string;
};

export type OrderDetail = {
  productId: string;
  productName: string;
  productImage: string;
  size: SizeEnum;
  quantity: number;
  totalPrice: number;
};

export type Profile = {
  id: string;
  group: string;
};

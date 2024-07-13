import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import OrderDetail from "@/components/order-detail/OrderDetail";

const Order = () => {
  const { id: idString } = useLocalSearchParams();
  let id: String | undefined;
  if (typeof idString === "string") {
    id = idString;
  } else if (Array.isArray(idString) && idString.length > 0) {
    id = idString[0];
  }

  const orders = useSelector((state: RootState) => state.orders.orders);
  const order = orders.find((order) => order.id === id);

  if (!order) {
    return;
  }
  return (
    <SafeAreaView className="h-full bg-white">
      <OrderDetail order={order} />
    </SafeAreaView>
  );
};

export default Order;

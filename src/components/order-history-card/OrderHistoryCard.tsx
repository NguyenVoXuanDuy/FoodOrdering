import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import OrderImageGroup from "@/components/order-history-card/OrderImageGroup";
import { Order, OrderStatus } from "@/types/type";
import moment from "moment";
import { Link } from "expo-router";

type OrderHistoryCardProps = {
  order: Order;
};

export const getOrderStatusColor = (status: OrderStatus) => {
  if (status === "Preparing") return "#FF5722";
  if (status === "Delivering") return "#FFC107";
  if (status === "Fulfilled") return "#4CAF50";
};
const OrderHistoryCard = ({ order }: OrderHistoryCardProps) => {
  return (
    <Link href={`/orders/${order.id}`} asChild>
      <TouchableOpacity>
        <View className="p-3 flex flex-row justify-between items-center border border-gray-300  rounded-lg mb-2 ">
          <View>
            <Text className="text-[16px] text-secondary font-semibold">
              Order#. {order.id}
            </Text>
            <Text className="text-[14px] text-gray-400/80 ">
              {moment(new Date(order.createdAt)).fromNow()}
            </Text>
            <Text
              style={{
                color: getOrderStatusColor(order.status as OrderStatus),
              }}
              className="text-[16px]  font-semibold mb-4">
              {order.status}
            </Text>
            <Text className="text-[16px]  text-secondary font-semibold ">
              Total: ${order.totalPrice.toFixed(2)}
            </Text>
          </View>
          <View className="mr-3">
            <OrderImageGroup
              images={order.orderDetails.map((orderDetail) => {
                return orderDetail.productImage;
              })}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default OrderHistoryCard;

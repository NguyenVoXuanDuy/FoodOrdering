import { View, Text } from "react-native";
import React from "react";
import { OrderDetail } from "@/types/type";
import { Image } from "expo-image";
type OrderDetailCardProps = {
  orderDetail: OrderDetail;
};
const OrderDetailCard = ({ orderDetail }: OrderDetailCardProps) => {
  return (
    <View
      className="h-[108px] py-2 flex flex-row
    relative rounded-xl mb-2">
      <View className="">
        <Image
          source={orderDetail.productImage || undefined}
          style={{ width: 92, height: 92 }}
          cachePolicy="memory-disk"
          className="h-[92px] aspect-square rounded-full "
        />
      </View>
      <View className="flex flex-col  px-5 py-1  justify-between flex-1">
        <View className="">
          <Text className="text text-secondary text-xl font-semibold">
            {orderDetail.productName}
          </Text>
          <Text className="text-[16px] text-gray-400 ">
            Size: {orderDetail.size}
          </Text>
        </View>
        <View className="flex flex-row space-x-1"></View>
        <View className="flex flex-row justify-between items-center">
          <Text className="font-bold text-secondary">
            Quantity:{" "}
            <Text className=" text-gray-400 ">x{orderDetail.quantity}</Text>
          </Text>
          <Text className="font-bold text-secondary">
            ${orderDetail.totalPrice.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OrderDetailCard;

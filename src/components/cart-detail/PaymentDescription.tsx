import { View, Text } from "react-native";
import React from "react";

import { TouchableOpacity } from "react-native";
type PaymentDescriptionProps = {
  totalPrice: number;
  deliveryFee: number;
};
const PaymentDescription = ({
  totalPrice,
  deliveryFee,
}: PaymentDescriptionProps) => {
  return (
    <View>
      <View className="space-y-2">
        <View className="h-1"></View>
        <Text className="text-secondary font-semibold text-xl">
          Payment Descriptions
        </Text>
        <View className="flex flex-row justify-between items-center">
          <Text className="text-gray-400 text-[16px]">Sub Total</Text>
          <Text className="text-secondary font-semibold text-[16px]">
            ${totalPrice.toFixed(2)}
          </Text>
        </View>
        <View className="flex flex-row justify-between items-center">
          <Text className="text-gray-400 text-[16px]">Delivery Fee</Text>
          <Text className="text-secondary font-semibold text-[16px]">
            ${deliveryFee.toFixed(2)}
          </Text>
        </View>
        <View className="flex flex-row justify-between items-center mb-1">
          <Text className="text-gray-400 text-[16px]">Discount</Text>
          <Text className="text-secondary font-semibold text-[16px]">
            -$0.00
          </Text>
        </View>
        <View className="h-[2px] bg-gray-400/40 "></View>
        <View className="flex flex-row justify-between items-center">
          <Text className="text-secondary font-semibold text-[18px]">
            Total
          </Text>
          <Text className="text-secondary font-semibold text-[18px]">
            ${(totalPrice + deliveryFee).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PaymentDescription;

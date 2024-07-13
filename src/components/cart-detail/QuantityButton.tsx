import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { CartDetail } from "@/types/type";
import { useDispatch } from "react-redux";
import { decrementQuantity, incrementQuantity } from "@/redux/cartSlice";

type QuantityButtonProps = {
  cartDetail: CartDetail;
};
const QuantityButton = ({ cartDetail }: QuantityButtonProps) => {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(
      incrementQuantity({
        product: cartDetail.product,
        size: cartDetail.size,
      })
    );
  };

  const handleDecrement = () => {
    dispatch(
      decrementQuantity({
        product: cartDetail.product,
        size: cartDetail.size,
      })
    );
  };
  return (
    <View className="flex-row flex space-x-2 items-center">
      <TouchableOpacity onPress={handleDecrement}>
        <View className="flex flex-row  items-center justify-center bg-gray-100 rounded-full w-6 h-6">
          <Text className="text-secondary font-bold">–</Text>
        </View>
      </TouchableOpacity>
      <Text className="font-bold text-secondary">{cartDetail.quantity}</Text>
      <TouchableOpacity onPress={handleIncrement}>
        <View className="flex flex-row items-center justify-center bg-primary rounded-full w-6 h-6">
          <Text className="text-white font-bold">+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default QuantityButton;

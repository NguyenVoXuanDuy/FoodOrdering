import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Shadow } from "react-native-shadow-2";

import SizeEnum from "@/enums/SizeEnum";
type ProductSizeProps = {
  size: SizeEnum;
  onClick: () => void;
  isActive: boolean;
};

export const capitalizeString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const ProductSize = ({ size, onClick, isActive }: ProductSizeProps) => {
  return (
    <TouchableOpacity className="self-start" onPress={() => onClick()}>
      <View
        className={`h-[52px] w-[80px] mr-3 rounded-2xl flex justify-center items-center
      ${isActive ? "bg-primary" : "bg-[#F9F9F9]"}
      `}>
        <Text
          className={`text-[16px] ${
            isActive ? "text-white" : "text-gray-400"
          }`}>
          {capitalizeString(size)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductSize;

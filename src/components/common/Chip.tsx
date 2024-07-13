import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type ChipProps = {
  title: String;
  isActive: boolean;
  onPress?: () => void;
};
const Chip = ({ title, isActive, onPress }: ChipProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        className={`py-3 px-4 bg-primary rounded-xl mr-3 ${
          isActive ? "bg-primary" : "bg-gray-100"
        }`}>
        <Text className={`${isActive ? "text-white" : "text-gray-400"}`}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Chip;

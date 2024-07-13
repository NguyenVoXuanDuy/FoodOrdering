import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
type IngredientChipProps = {
  ingredient: string;
  onRemove: () => void;
};
const IngredientChip = ({ ingredient, onRemove }: IngredientChipProps) => {
  return (
    <View className="flex flex-row justify-between items-center mt-1 mr-1 bg-secondary/90 px-3 py-2 rounded-[12px]">
      <Text className="text-white font-semibold mr-2">{ingredient}</Text>
      <TouchableOpacity onPress={onRemove}>
        <Text className="text-white font-bold text-xl">×</Text>
      </TouchableOpacity>
    </View>
  );
};

export default IngredientChip;

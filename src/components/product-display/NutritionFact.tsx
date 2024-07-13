import React from "react";
import { Text, View } from "react-native";

type NutritionFactProps = {
  metric: string;
  content: string;
};
const NutritionFact = ({ metric, content }: NutritionFactProps) => {
  return (
    <View className="flex flex-col  items-center">
      <Text className="font-bold mb-[2px] text-secondary">{content}</Text>
      <Text className="text-gray-500 text-[12px]">{metric}</Text>
    </View>
  );
};

export default NutritionFact;

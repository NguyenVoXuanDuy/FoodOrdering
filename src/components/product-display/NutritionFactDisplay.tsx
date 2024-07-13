import NutritionFact from "@/components/product-display/NutritionFact";
import React from "react";
import { View } from "react-native";

type NutritionFactDisplayProps = {
  kcal: number;
  fats: number;
  protein: number;
  carbohydrates: number;
};
const NutritionFactDisplay = ({
  kcal,
  fats,
  protein,
  carbohydrates,
}: NutritionFactDisplayProps) => {
  return (
    <View className="flex flex-row border justify-between p-3 px-4 rounded-2xl border-gray-500/20">
      <NutritionFact metric="Kcal" content={kcal.toString()} />
      <NutritionFact metric="Fats" content={fats.toString()} />
      <NutritionFact metric="Protein" content={protein.toString()} />
      <NutritionFact metric="Carbs" content={carbohydrates.toString()} />
      <NutritionFact metric="Grams" content={"100"} />
    </View>
  );
};

export default NutritionFactDisplay;

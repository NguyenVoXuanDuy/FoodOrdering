import SizeEnum from "@/enums/SizeEnum";

import { Product } from "@/types/type";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
type ProductCardDisplayProps = {
  product: Product;
};

const ProductCardDisplay = ({ product }: ProductCardDisplayProps) => {
  return (
    <Link href={`/products/${product.id}`} asChild>
      <TouchableOpacity>
        <View
          className="h-[108px] py-2 flex flex-row
    relative rounded-xl mb-2">
          <View>
            <Image
              source={product.image || undefined}
              style={{ width: 92, height: 92 }}
              cachePolicy="memory-disk"
              className="h-[92px] aspect-square rounded-full "
            />
          </View>
          <View className="flex flex-col justify-center p-5 flex-1 space-y-1">
            <Text className="text text-secondary text-xl font-semibold">
              {product.name}
            </Text>
            <View className="flex flex-row space-x-1">
              <View className="bg-gray-500/5  rounded-full justify-center items-center h-7 w-[75px] ">
                <Text className="text-secondary font-semibold  ">
                  ${product.price[SizeEnum.MEDIUM].toFixed(2)}
                </Text>
              </View>
              <View className=" rounded-full justify-center items-center h-7 w-[75px]">
                <Text className="text-gray-400 font-bold  ">
                  {product.calories} kcal
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default ProductCardDisplay;

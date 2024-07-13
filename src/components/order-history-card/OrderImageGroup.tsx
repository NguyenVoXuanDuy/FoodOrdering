import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";

type OrderImageGroupProps = {
  images: string[];
};
const OrderImageGroup = ({ images }: OrderImageGroupProps) => {
  if (images.length === 0) {
    return null;
  }

  if (images.length === 1) {
    return (
      <Image
        source={images[0] || undefined}
        style={{ width: 75, height: 75 }}
        cachePolicy="memory-disk"
        className="rounded-full"
      />
    );
  }

  if (images.length <= 3) {
    return (
      <View className="flex flex-row">
        {images.map((image, index) => (
          <Image
            key={index}
            source={image || undefined}
            style={{ width: 75, height: 75 }}
            cachePolicy="memory-disk"
            className={`  rounded-full ${
              index == images.length - 1 ? "" : " -mr-10"
            }`}
          />
        ))}
      </View>
    );
  }
  return (
    <View className="flex flex-row">
      {images.slice(0, 2).map((image, index) => (
        <Image
          key={index}
          source={image || undefined}
          style={{ width: 75, height: 75 }}
          cachePolicy="memory-disk"
          className="rounded-full -mr-10"
        />
      ))}
      <View className="relative overflow-hidden">
        <View className="absolute z-10 flex justify-center items-center w-full h-full bg-black/60 rounded-full">
          <Text className="text-white text-xl font-semibold ">
            +{images.length - 2}
          </Text>
        </View>
        <Image
          source={images[2] || undefined}
          style={{ width: 75, height: 75 }}
          cachePolicy="memory-disk"
          className="h-[92px] aspect-square rounded-full "
        />
      </View>
    </View>
  );
};

export default OrderImageGroup;

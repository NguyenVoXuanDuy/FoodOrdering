import { View, Text } from "react-native";
import React from "react";
import { CartDetail, Product } from "@/types/type";
import SizeEnum from "@/enums/SizeEnum";
import QuantityButton from "@/components/cart-detail/QuantityButton";
import { Image } from "expo-image";

type CartDetailCardProps = {
  cartDetail: CartDetail;
};
const CartDetailCard = ({ cartDetail }: CartDetailCardProps) => {
  const product = cartDetail.product as Product;

  return (
    <View
      className="h-[108px] py-2 flex flex-row
    relative rounded-xl mb-2">
      <View className="">
        <Image
          source={product.image || undefined}
          style={{ width: 92, height: 92 }}
          cachePolicy="memory-disk"
          className="h-[92px] aspect-square rounded-full "
        />
      </View>
      <View className="flex flex-col  px-5 py-1  justify-between flex-1">
        <View className="">
          <Text className="text text-secondary text-xl font-semibold">
            {product.name}
          </Text>
          <Text className="text-[16px] text-gray-400 ">
            Size: {cartDetail.size}
          </Text>
        </View>
        <View className="flex flex-row space-x-1"></View>
        <View className="flex flex-row justify-between items-center">
          <QuantityButton cartDetail={cartDetail} />
          <Text className="font-bold text-secondary">
            ${(cartDetail.quantity * product.price[cartDetail.size]).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CartDetailCard;

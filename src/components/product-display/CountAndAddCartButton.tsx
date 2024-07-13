import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Product } from "@/types/type";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import SizeEnum from "@/enums/SizeEnum";
import { Link } from "expo-router";

type CountAndAddCartButtonProps = {
  product: Product;
  selectedSize: SizeEnum;
};
const CountAndAddCartButton = ({
  product,
  selectedSize,
}: CountAndAddCartButtonProps) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity === 1 ? 1 : prevQuantity - 1));
  };

  const handleAddToCart = () => {
    setQuantity(1);
    dispatch(
      addToCart({ product: product, quantity: quantity, size: selectedSize })
    );
  };

  return (
    <View className="flex flex-row justify-between mt-2 ">
      <View
        className="flex flex-row 1 px-4 w-[100px] h-16 bg-gray-100 
      items-center rounded-2xl justify-between mr-3">
        <TouchableOpacity onPress={handleDecrement} disabled={quantity === 1}>
          <Text
            className={`text-2xl ${
              quantity === 1 ? "text-gray-400" : "text-secondary"
            }`}>
            -
          </Text>
        </TouchableOpacity>
        <Text className="text-secondary text-xl font-semibold">{quantity}</Text>
        <TouchableOpacity onPress={handleIncrement}>
          <Text className="text-secondary text-2xl">+</Text>
        </TouchableOpacity>
      </View>

      <Link href="/cart" asChild>
        <TouchableOpacity
          onPress={handleAddToCart}
          className=" flex flex-row bg-secondary px-6 h-16
         flex-1 items-center rounded-2xl justify-between">
          <Text className="text-white font-bold">Add to Cart</Text>
          <Text className="text-white font-bold">
            ${(product.price[selectedSize] * quantity).toFixed(2)}
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default CountAndAddCartButton;

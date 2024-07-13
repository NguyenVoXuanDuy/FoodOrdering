import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBarStyle,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Product } from "@/types/type";
import React, { useState } from "react";
import IconDisplay from "@/components/product-display/IconDisplay";
import StarSvgIcon from "@assets/svg/StarSvgIcon";
import ProductSize from "@/components/product-display/ProductSize";
import SizeEnum from "@/enums/SizeEnum";
import NutritionFactDisplay from "@/components/product-display/NutritionFactDisplay";
import EllipseSvg from "@assets/svg/EllipseSvg";
import CountAndAddCartButton from "@/components/product-display/CountAndAddCartButton";
import BackPreviousButton from "@/components/common/BackPreviousButton";
import { Link } from "expo-router";
import CartSvgIcon from "@assets/svg/CartSvgIcon";
import EditSvgIcon from "@assets/svg/EditSvgIcon";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Image } from "expo-image";

type ProductDisplayProps = {
  product: Product;
};

const { width: screenWidth } = Dimensions.get("window");
const imageWidth = screenWidth * 0.82;
const ProductDisplay = ({ product }: ProductDisplayProps) => {
  const isAdmin = useSelector((state: RootState) => state.auth.user?.isAdmin);

  const [selectedSize, setSelectedSize] = useState<SizeEnum>(SizeEnum.SMALL);
  return (
    <SafeAreaView className=" bg-white overflow-hidden h-full">
      <EllipseSvg />
      <View className="flex justify-center items-center relative">
        <View className="absolute z-10 top-3 left-5 flex flex-row w-[92%] justify-between items-center">
          <BackPreviousButton backgroundColor="white" textColor="#0a1120" />
          {!isAdmin ? (
            <Link href="/cart" asChild>
              <TouchableOpacity>
                <View className="p-[10px] bg-secondary rounded-lg">
                  <CartSvgIcon />
                </View>
              </TouchableOpacity>
            </Link>
          ) : (
            <Link href={`products/edit/${product.id}`} asChild>
              <TouchableOpacity>
                <View className="p-[10px] bg-secondary rounded-lg">
                  <EditSvgIcon />
                </View>
              </TouchableOpacity>
            </Link>
          )}
        </View>
        <Image
          key={product.id}
          source={product.image || undefined}
          style={{ width: imageWidth, height: imageWidth }}
          cachePolicy="memory-disk"
          className="rounded-full aspect-square mt-3"
        />
      </View>
      <View className="p-5 h-[57%]">
        <ScrollView className="">
          <View className="">
            <IconDisplay icon={<StarSvgIcon />} content={"4.8"} />
            <View className="flex justify-between flex-row">
              <Text className="font-bold text-2xl text-secondary">
                {product.name}
              </Text>
              <Text className="font-bold text-2xl flex flex-row items-end">
                <Text className="text-primary text-[16px]">$</Text>
                {product.price[selectedSize].toFixed(2)}
              </Text>
            </View>
            <View className="flex flex-row mt-3">
              {Object.values(SizeEnum).map((size) => (
                <ProductSize
                  key={size}
                  size={size}
                  onClick={() => setSelectedSize(size)}
                  isActive={selectedSize === size}
                />
              ))}
            </View>

            <View className="mt-4">
              <Text className="text-gray-500 mb-2">
                Nutritional value per 100g
              </Text>
              <NutritionFactDisplay
                kcal={product.calories}
                fats={product.fat}
                protein={product.protein}
                carbohydrates={product.carbs}
              />
            </View>
            <View className="mt-4">
              <Text className="font-bold">Ingredients</Text>
              <Text className="mt-1 text-gray-500 mb-4">
                {product.ingredients.join(", ")}
              </Text>
            </View>
          </View>
        </ScrollView>
        {!isAdmin && (
          <CountAndAddCartButton
            product={product}
            selectedSize={selectedSize}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProductDisplay;

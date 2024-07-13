import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";

import ProductForm from "@/components/product-form/ProductForm";
import { CreateProduct } from "@/redux/createProductSlice";
import SizeEnum from "@/enums/SizeEnum";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import CommonButton from "@/components/common/CommonButton";
import { deleteProduct, updateProduct } from "@/redux/productsSlice";
import { Product } from "@/types/type";
import Toast from "react-native-toast-message";
import TrashSvgIcon from "@assets/svg/TrashSvgIcon";

const ProductDetail = () => {
  const { id: idString } = useLocalSearchParams();
  let id: String | undefined;
  if (typeof idString === "string") {
    id = idString;
  } else if (Array.isArray(idString) && idString.length > 0) {
    id = idString[0];
  }
  const products = useSelector((state: RootState) => state.products.products);
  const product = products.find((product) => product.id === id);

  if (!product) {
    return (
      <View className="flex items-center justify-center h-full">
        <Text className="text-lg text-gray-500">Product not found</Text>
      </View>
    );
  }
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(
    (state: RootState) => state.products.isUpdatingLoading
  );

  const [editProduct, setEditProduct] = useState<CreateProduct>({
    ...product,
    price: {
      [SizeEnum.SMALL]: product.price[SizeEnum.SMALL].toString(),
      [SizeEnum.MEDIUM]: product.price[SizeEnum.MEDIUM].toString(),
      [SizeEnum.LARGE]: product.price[SizeEnum.LARGE].toString(),
    },
    calories: product.calories.toString(),
    fat: product.fat.toString(),
    protein: product.protein.toString(),
    carbs: product.carbs.toString(),
    ingredients: product.ingredients.map((ingredient) => ingredient.toString()),
    image: product.image || null,
  });

  const onProductChange = (product: CreateProduct) => {
    setEditProduct(product);
  };

  const handleUpdateProduct = () => {
    const updatedProduct: Product = {
      ...editProduct,
      price: {
        [SizeEnum.SMALL]: parseFloat(editProduct.price[SizeEnum.SMALL]),
        [SizeEnum.MEDIUM]: parseFloat(editProduct.price[SizeEnum.MEDIUM]),
        [SizeEnum.LARGE]: parseFloat(editProduct.price[SizeEnum.LARGE]),
      },
      calories: parseFloat(editProduct.calories),
      fat: parseFloat(editProduct.fat),
      protein: parseFloat(editProduct.protein),
      carbs: parseFloat(editProduct.carbs),
      createdAt: product.createdAt,
      updatedAt: new Date().toISOString(),
      id: editProduct.id ? editProduct.id : "-1",
    };

    dispatch(updateProduct(updatedProduct)).then(() => {
      Toast.show({
        type: "success",
        text1: "Action Successful",
        text2: "Product updated successfully",
        visibilityTime: 2000,
      });
    });
  };

  const handleDeleteProduct = () => {
    router.dismiss(2);
    dispatch(deleteProduct(product.id)).then(() => {
      Toast.show({
        type: "success",
        text1: "Action Successful",
        text2: "Product deleted",
        visibilityTime: 2000,
      });
    });
  };

  return (
    <SafeAreaView className=" h-full bg-white relative">
      <View className="p-4 h-full">
        <View className="h-[92%]">
          <ProductForm
            product={editProduct}
            onProductChange={onProductChange}
            title="Edit Product"
            onDelete={handleDeleteProduct}
            isEdit
          />
        </View>
        <View className="mt-2">
          <CommonButton
            title="Update Product"
            isLoading={isLoading}
            onPress={handleUpdateProduct}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;

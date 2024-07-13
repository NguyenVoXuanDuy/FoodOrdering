import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef } from "react";
import BackPreviousButton from "@/components/common/BackPreviousButton";
import DismissKeyboard from "@/components/common/DismissKeyboard";
import ProductForm from "@/components/product-form/ProductForm";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

import { CreateProduct, productChange } from "@/redux/createProductSlice";
import useAuth from "@/util/useAuth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { addProduct } from "@/redux/productsSlice";
import { Product } from "@/types/type";
import CommonButton from "@/components/common/CommonButton";
const styles = StyleSheet.create({
  loadingOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
});
const AddNewProduct = () => {
  const { isAdmin } = useAuth();
  if (!isAdmin) {
    return null;
  }

  const product = useSelector(
    (state: RootState) => state.createProduct.product,
    shallowEqual
  );

  const isLoading = useSelector(
    (state: RootState) => state.products.isUploadingLoading
  );

  const dispatch = useDispatch<AppDispatch>();

  const onProductChange = (product: CreateProduct) => {
    dispatch(productChange(product));
  };

  const handleAddProduct = () => {
    if (
      product.name === "" ||
      product.price.small === "" ||
      product.price.medium === "" ||
      product.price.large === "" ||
      product.calories === "" ||
      product.fat === "" ||
      product.protein === "" ||
      product.carbs === "" ||
      product.ingredients.length === 0
    ) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill all the fields",
        visibilityTime: 2000,
      });
      return;
    }
    const newProduct: Product = {
      ...product,
      id: "",
      price: {
        small: parseFloat(product.price.small),
        medium: parseFloat(product.price.medium),
        large: parseFloat(product.price.large),
      },
      calories: parseFloat(product.calories),
      fat: parseFloat(product.fat),
      protein: parseFloat(product.protein),
      carbs: parseFloat(product.carbs),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch(addProduct(newProduct)).then(() => {
      Toast.show({
        type: "success",
        text1: "Action Successful",
        text2: "Product has been added successfully",
        visibilityTime: 2500,
      });
      dispatch(
        productChange({
          id: null,
          image: null,
          name: "",
          price: {
            small: "",
            medium: "",
            large: "",
          },
          calories: "",
          fat: "",
          protein: "",
          carbs: "",
          ingredients: [],
        })
      );
    });
  };

  return (
    <SafeAreaView className=" h-full bg-white relative">
      <View className="p-4 h-full">
        <View className="h-[92%]">
          <ProductForm
            product={product}
            onProductChange={onProductChange}
            title="Add new Product"
          />
        </View>
        <View className="mt-2">
          <CommonButton
            title="Add Product"
            isLoading={isLoading}
            onPress={handleAddProduct}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddNewProduct;

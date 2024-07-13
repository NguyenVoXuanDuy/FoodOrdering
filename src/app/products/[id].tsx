import { View, Text } from "react-native";
import React from "react";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import ProductDisplay from "@/components/product-display/ProductDisplay";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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
    router.back();
    return;
  }

  return <ProductDisplay product={product} />;
};

export default ProductDetail;

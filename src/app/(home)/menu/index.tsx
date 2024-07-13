import { SafeAreaView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";

import ProductCardDisplay from "@/components/product-card-display/ProductCardDisplay";
import HomeHeader from "@/components/home-header/HomeHeader";
import { Product } from "@/types/type";
import { fetchProducts } from "@/redux/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import store, { AppDispatch, RootState } from "@/redux/store";
import ProductLoadingSkeletonSvg from "@assets/svg/ProductLoadingSkeletonSvg";

const numberOfFirstFetchingResult = -1;
const offset = 0;

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    // because useEffect just memorize products when it's first called
    // despite products is updated in the store, useEffect still keep the old value
    // so we need to get state directly from store to get the latest value
    const products = store.getState().products.products;
    if (products.length > 0) return;
    dispatch(
      fetchProducts({
        numberOfResult: numberOfFirstFetchingResult,
        offset: offset,
      })
    );
  }, []);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={products}
        ListHeaderComponent={<HomeHeader />}
        ListEmptyComponent={
          <View className="mt-2">
            {/* "5" is the number of the ProductLoadingSkeletonSvg displayed when user enter */}
            {[...Array(5)].map((_, index) => {
              return <ProductLoadingSkeletonSvg key={index} />;
            })}
          </View>
        }
        renderItem={({ item }) => {
          return <ProductCardDisplay product={item as Product} />;
        }}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16, paddingBottom: 75 }}
      />
    </SafeAreaView>
  );
};

export default Home;

import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CartSvgIcon from "@assets/svg/CartSvgIcon";
import LocationSvgIcon from "@assets/svg/LocationSvgIcon";
import SearchSvgIcon from "@assets/svg/SearchSvgIcon";
import Chip from "@/components/common/Chip";
import { Link } from "expo-router";
import PlusSvgIcon from "@assets/svg/PlusSvgIcon";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useAuth from "@/util/useAuth";
import { uploadAllProducts } from "@/firebase/firebaseService";

const categories = [
  {
    id: "1",
    title: "Pizza",
  },
  {
    id: "2",
    title: "Burger",
  },
  {
    id: "3",
    title: "Salad",
  },
  {
    id: "4",
    title: "Sushi",
  },
  {
    id: "5",
    title: "Dessert",
  },
];

const HomeHeader = () => {
  const { isAdmin, name } = useAuth();

  return (
    <View className="mb-3">
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row items-end space-x-1">
          <LocationSvgIcon />
          <Text className="text-secondary/70">Hồ Chí Minh, Việt Nam</Text>
        </View>
        {isAdmin ? (
          <Link href="products/new" asChild>
            <TouchableOpacity>
              <PlusSvgIcon />
            </TouchableOpacity>
          </Link>
        ) : (
          <Link href="/cart" asChild>
            <TouchableOpacity>
              <View className="p-[10px] bg-secondary rounded-lg">
                <CartSvgIcon />
              </View>
            </TouchableOpacity>
          </Link>
        )}
      </View>
      <View>
        <Text className="text-xl font-semibold text-gray-300 mt-4">
          It's great to see you
        </Text>
        <Text className="text-2xl font-bold text-secondary">{name} 🥺</Text>
      </View>
      <View className=" mt-4  items-center flex flex-row bg-gray-100 rounded-xl">
        <TextInput
          className="  p-5  flex-1"
          placeholder="Search by food name..."
          placeholderTextColor="#9ca3af"
        />
        <SearchSvgIcon />
        <View className="w-4"></View>
        {/* put this into independent file to code logic later */}
      </View>
      <View className="mt-5">
        <FlatList
          data={categories}
          renderItem={({ item, index }) => (
            <Chip title={item.title} isActive={item.id === "1"}  />
          )}
          keyExtractor={(item) => item.id}
          horizontal={true}
        />
      </View>
    </View>
  );
};

export default HomeHeader;

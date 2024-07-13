import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  DimensionValue,
} from "react-native";
import React from "react";
import {
  BottomTabNavigationEventMap,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs"; // Import the type
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from "@react-navigation/native";

import HomeSvgIcon from "@assets/svg/HomeSvgIcon";
import OrderSvgIcon from "@assets/svg/OrderSvgIcon";
import ProfileSvgIcon from "@assets/svg/ProfileSvgIcon";
import { Link, router } from "expo-router";
import CartSvgIcon from "@assets/svg/CartSvgIcon";
import LogoutSvgIcon from "@assets/svg/LogoutSvgIcon";
import { auth } from "@/firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logout } from "@/redux/authSlice";
import { removeCart } from "@/redux/cartSlice";
import { removeOrders } from "@/redux/ordersSlice";

type TabBarProps = {
  state: TabNavigationState<ParamListBase>;
  descriptors: any;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 25,
    width: "92%",
    alignItems: "center",
    marginHorizontal: 16,
    borderCurve: "continuous",
  },
});

const TabBar = ({ state, descriptors, navigation }: TabBarProps) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <View
      style={styles.tabBar}
      className="bg-secondary rounded-[28px] flex flex-row justify-between  p-7">
      <Link href="/menu" asChild>
        <TouchableOpacity>
          <View className="flex flex-row justify-center items-center">
            <HomeSvgIcon color={state.index === 0 ? "white" : "#646972"} />
            <Text
              className={`${
                state.index === 0 ? "text-white" : "text-[#646972]"
              } ml-2 font-bold `}>
              Menu
            </Text>
          </View>
        </TouchableOpacity>
      </Link>
      <Link href="/orders" asChild>
        <TouchableOpacity>
          <View className="flex flex-row justify-center items-center">
            <OrderSvgIcon color={state.index === 1 ? "white" : "#646972"} />
            <Text
              className={`${
                state.index === 1 ? "text-white" : "text-[#646972]"
              } ml-2 font-bold`}>
              Orders
            </Text>
          </View>
        </TouchableOpacity>
      </Link>

      <TouchableOpacity
        onPress={() => {
          dispatch(logout()).then(() => {
            dispatch(removeCart());
            dispatch(removeOrders());
            navigation.reset({
              index: 0,
              routes: [{ name: "(auth)" as never }],
            });
          });
        }}>
        <View className="flex flex-row justify-center items-center">
          <LogoutSvgIcon color={state.index === 2 ? "white" : "#646972"} />
          <Text
            className={`${
              state.index === 2 ? "text-white" : "text-[#646972]"
            } ml-2 font-bold`}>
            Log out
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TabBar;

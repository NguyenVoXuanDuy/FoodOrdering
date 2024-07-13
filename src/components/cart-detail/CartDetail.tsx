import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import CartDetailCard from "@/components/cart-detail/CartDetailCard";
import BackPreviousButton from "@/components/common/BackPreviousButton";
import PaymentDescription from "@/components/cart-detail/PaymentDescription";

import { Order, OrderDetail } from "@/types/type";
import useAuth from "@/util/useAuth";
import CommonButton from "@/components/common/CommonButton";
import { makeOrder } from "@/redux/ordersSlice";
import { removeCart } from "@/redux/cartSlice";
import Toast from "react-native-toast-message";
import { useStripe } from "@stripe/stripe-react-native";
import { Link, router } from "expo-router";
import { deliveryFee } from "@/components/check-out/CheckOut";

const CartDetail = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const { cartDetails, totalPrice } = cart;

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex p-4 bg-white flex-col justify-between h-full">
        <View className=" flex  flex-row  justify-between items-center mb-5">
          <BackPreviousButton backgroundColor="secondary" textColor="white" />
          <Text className="text-2xl font-semibold text-secondary ">
            My Cart
          </Text>
          <View className="w-5 h-5"></View>
        </View>
        <ScrollView className="">
          <Text className="text-lg text-secondary font-semibold  mb-1">
            Items:
          </Text>
          {cartDetails.map((cartDetail) => (
            <CartDetailCard cartDetail={cartDetail} key={cartDetail.id} />
          ))}
        </ScrollView>
        <View>
          <PaymentDescription
            totalPrice={totalPrice}
            deliveryFee={deliveryFee}
          />

          <TouchableOpacity
            onPress={() => {
              if (cartDetails.length === 0)
                alert("Please add some items to your cart");
              else router.push("/cart/checkout");
            }}
            className="mt-6">
            <View className="flex justify-center items-center h-[65px] bg-secondary rounded-full">
              <Text className="text-white font-semibold text-[18px]">
                Go To Checkout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartDetail;

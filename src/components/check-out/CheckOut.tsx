import BackPreviousButton from "@/components/common/BackPreviousButton";
import { removeCart } from "@/redux/cartSlice";
import { makeOrder } from "@/redux/ordersSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Order, OrderDetail } from "@/types/type";
import useAuth from "@/util/useAuth";
import CashOnDeliverySvgIcon from "@assets/svg/CashOnDeliverySvgIcon";
import StripeSvgIcon from "@assets/svg/StripeSvgIcon";
import { useStripe } from "@stripe/stripe-react-native";
import { Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

export const deliveryFee = 5.0;
const CheckOut = () => {
  console.log("CheckOut");
  const cart = useSelector((state: RootState) => state.cart);
  const { cartDetails, totalPrice } = cart;
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useAuth();
  const isLoading = useSelector(
    (state: RootState) => state.orders.isMakingOrderLoading
  );
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const onCheckout = async () => {
    if (cartDetails.length === 0) {
      alert("Your cart is empty");
      return;
    }

    console.log(totalPrice);
    const response = await fetch(
      `https://ca51-113-172-81-242.ngrok-free.app/payments/intents`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.floor((totalPrice + deliveryFee) * 100),
        }),
      }
    );

    const responseJson = await response.json();

    if (responseJson.error) {
      alert("Something went wrong");
      return;
    }

    console.log(responseJson);
    const initResponse = await initPaymentSheet({
      merchantDisplayName: "Xuân Duy",
      paymentIntentClientSecret: responseJson.paymentIntent,
      returnURL: "example://stripe-redirect",
    });
    if (initResponse.error) {
      console.log(initResponse.error);
      alert("Something went wrong");
      return;
    }

    const paymentResponse = await presentPaymentSheet();

    if (paymentResponse.error) {
      if (paymentResponse.error.code === "Canceled") return;
      alert(`Error code: ${paymentResponse.error.code}`);
      return;
    }

    handlePayment();
  };
  const handlePayment = () => {
    if (!id) {
      alert("something went wrong, please try again");
      return;
    }
    const order: Order = {
      id: "-1",
      orderDetails: cartDetails.map((cartDetail) => {
        return {
          productImage: cartDetail.product.image,
          productId: cartDetail.product.id,
          productName: cartDetail.product.name,
          quantity: cartDetail.quantity,
          totalPrice:
            cartDetail.product.price[cartDetail.size] * cartDetail.quantity,
          size: cartDetail.size,
        } as OrderDetail;
      }) as OrderDetail[],
      userId: id,
      status: "Preparing",
      address: "132A Vườn Lài, Phú Thọ Hòa, Tân Phú, Hồ Chí Minh",
      subTotal: totalPrice,
      deliveryFee: deliveryFee,
      totalPrice: totalPrice + deliveryFee,

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch(makeOrder(order)).then((order) => {
      dispatch(removeCart());
      Toast.show({
        type: "success",
        text1: "Action successful",
        text2: "Your order has been placed",
      });
    });
  };
  return (
    <SafeAreaView className="h-full bg-white">
      <View className="flex p-4 bg-white flex-col  h-full">
        <View className=" flex  flex-row  justify-between items-center mb-5">
          <BackPreviousButton backgroundColor="secondary" textColor="white" />
          <Text className="text-2xl font-semibold text-secondary ">
            Checkout
          </Text>
          {/* this is for balance the flex box */}
          <View className="w-5 h-5">
            <Text></Text>
          </View>
        </View>
        <View>
          <Text className="text-secondary font-semibold  text-[18px]">
            Payment Method
          </Text>
          <View className="mt-4 space-y-2">
            <View className="flex flex-row items-center p-2 border border-primary rounded-lg">
              <CashOnDeliverySvgIcon />

              <Text className="ml-1 text-secondary font-semibold text-[16px]">
                Cash on delivery
              </Text>
            </View>
            <View className="flex flex-row items-center p-2 border border-gray-200 rounded-lg">
              <StripeSvgIcon />

              <Text className="ml-1 text-secondary font-semibold text-[16px]">
                Stripe
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CheckOut;

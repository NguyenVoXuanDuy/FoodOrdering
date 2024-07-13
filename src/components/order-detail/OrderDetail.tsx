import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Order, OrderStatus } from "@/types/type";
import BackPreviousButton from "@/components/common/BackPreviousButton";

import OrderDetailCard from "@/components/order-detail/OrderDetailCard";
import Description from "@/components/order-detail/Description";
import { getOrderStatusColor } from "@/components/order-history-card/OrderHistoryCard";
import { Dropdown } from "react-native-element-dropdown";
import { get } from "firebase/database";
import useAuth from "@/util/useAuth";
import { updateOrderStatusToFirebase } from "@/firebase/firebaseService";
type OrderDetailProps = {
  order: Order;
};
const data = [
  {
    label: "Preparing",
    value: "Preparing",
  },
  {
    label: "Delivering",
    value: "Delivering",
  },
  {
    label: "Fulfilled",
    value: "Fulfilled",
  },
];
const OrderDetail = ({ order }: OrderDetailProps) => {
  const { isAdmin } = useAuth();

  const renderItem = (item: any) => {
    return (
      <View className="p-3">
        <Text
          className="text-xl font-semibold"
          style={{
            color: getOrderStatusColor(item.value as OrderStatus),
          }}>
          {item.label}
        </Text>
      </View>
    );
  };
  const styles = StyleSheet.create({
    dropdown: {
      marginTop: -12,
      width: order.status === "Fulfilled" ? 120 : 139,
      backgroundColor: "white",
      borderRadius: 12,
      padding: 12,
    },
    item: {
      padding: 10,
    },
    selectedTextStyle: {
      fontSize: 20,
      color: getOrderStatusColor(order.status as OrderStatus),
      fontWeight: "bold",
    },
  });
  return (
    <ScrollView className="">
      <View className="flex p-4 bg-white flex-col justify-between h-full">
        <View className=" flex  flex-row  justify-between items-center mb-5">
          <BackPreviousButton backgroundColor="secondary" textColor="white" />
          <View className="flex justify-center items-center">
            <Text className="text-2xl font-semibold text-secondary  z-[10000000000000px]">
              Order Detail
            </Text>
            {isAdmin ? (
              <Dropdown
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select item"
                value={order.status}
                onChange={(item) => {
                  updateOrderStatusToFirebase(
                    order.id,
                    item.value as OrderStatus
                  );
                }}
                renderItem={renderItem}
              />
            ) : (
              <Text
                style={{
                  color: getOrderStatusColor(order.status),
                }}
                className={`text-xl font-semibold  `}>
                {order.status}
              </Text>
            )}
          </View>
          <View className="w-5 h-5"></View>
        </View>
        <View className="">
          <Text className="text-secondary font-semibold  text-[18px]">
            Delivery Address:{" "}
            <Text className="text-gray-400 text-[16px]">{order.address}</Text>
          </Text>
        </View>
        <Text className="text-lg text-secondary font-semibold  mb-1">
          Items:
        </Text>
        {order.orderDetails.map((orderDetail) => (
          <OrderDetailCard
            orderDetail={orderDetail}
            key={orderDetail.productId + orderDetail.size + order.id}
          />
        ))}

        <View className="mb-[40px]">
          <Description totalPrice={order.totalPrice} />
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderDetail;

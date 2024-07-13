import { View, Text, SafeAreaView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

import OrderHistoryCard from "@/components/order-history-card/OrderHistoryCard";
import Chip from "@/components/common/Chip";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

import useAuth from "@/util/useAuth";
import { Order } from "@/types/type";

import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

import { addOrder, changeOrderStatus, removeOrders } from "@/redux/ordersSlice";
import ProductLoadingSkeletonSvg from "@assets/svg/ProductLoadingSkeletonSvg";

const modes = [
  {
    id: "1",
    title: "Active",
  },
  {
    id: "2",
    title: "Archived",
  },
];
const Orders = () => {
  const { id, isAdmin } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const [mode, setMode] = useState("1");
  const orders = useSelector((state: RootState) => state.orders.orders);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!id) return;
    let q;
    if (isAdmin) {
      q = query(collection(db, "orders"), orderBy("createdAt", "asc"));
    } else {
      q = query(
        collection(db, "orders"),
        where("userId", "==", id),
        orderBy("createdAt", "asc")
      );
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const changes = snapshot.docChanges();
      changes.forEach((change) => {
        const data = change.doc.data();
        const order = {
          id: change.doc.id,
          ...data,
          createdAt: data.createdAt
            ? data.createdAt.toDate().toISOString()
            : new Date().toISOString(),
          updatedAt: data.createdAt
            ? data.createdAt.toDate().toISOString()
            : new Date().toISOString(),
        } as Order;
        // explain for this code block:
        //  createdAt: data.createdAt
        //     ? data.createdAt.toDate().toISOString()
        //     : new Date().toISOString(),
        //   updatedAt: data.createdAt
        //     ? data.createdAt.toDate().toISOString()
        //     : new Date().toISOString(),
        // because of   "latency compensation": "https://firebase.google.com/docs/firestore/query-data/listen#events-local-changes"
        // summary: when you add a new document,
        // it will be added to the local cache first, then it will be added to the server

        if (change.type === "added") {
          dispatch(addOrder(order));
        } else if (change.type === "modified") {
          dispatch(changeOrderStatus({ id: order.id, status: order.status }));
        } else if (change.type === "removed") {
        }
        setIsLoading(false);
      });
    });
    return () => {
      console.log("unsubscribed");
      dispatch(removeOrders());
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        ListEmptyComponent={isLoading ? <ProductLoadingSkeletonSvg /> : null}
        data={orders}
        ListHeaderComponent={
          <View className="mb-3">
            <Text className=" text-2xl   text-secondary">
              {isAdmin ? "All" : "My"}
            </Text>
            <Text className="text-3xl text-secondary font-bold mb-3">
              Orders History
            </Text>
            <View className="mt-3 mb-4">
              <FlatList
                data={modes}
                renderItem={({ item, index }) => (
                  <Chip
                    title={item.title}
                    isActive={mode === item.id}
                    onPress={() => setMode(item.id)}
                  />
                )}
                keyExtractor={(item) => item.id}
                horizontal={true}
              />
            </View>
          </View>
        }
        renderItem={({ item }) => {
          if (mode === "2" && item.status === "Fulfilled")
            return <OrderHistoryCard order={item} />;
          if (mode === "1" && item.status !== "Fulfilled")
            return <OrderHistoryCard order={item} />;
          return null;
        }}
        // keyExtractor={(item) => item}
        contentContainerStyle={{ padding: 16, paddingBottom: 75 }}
      />
    </SafeAreaView>
  );
};

export default Orders;

import { View, Text, SafeAreaViewComponent } from "react-native";
import React, { useEffect } from "react";
import { Stack, Tabs } from "expo-router";

import { useDispatch } from "react-redux";
import store, { AppDispatch } from "@/redux/store";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;

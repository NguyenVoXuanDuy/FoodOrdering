import { View, Text, SafeAreaViewComponent } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;

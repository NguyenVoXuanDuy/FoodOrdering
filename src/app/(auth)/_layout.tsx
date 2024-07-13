import { View, Text, SafeAreaViewComponent } from "react-native";
import React from "react";
import { Redirect, Stack, Tabs } from "expo-router";
import { auth } from "@/firebase/firebaseConfig";

const Layout = () => {
  if (auth.currentUser) return <Redirect href={"/(home)"} />;
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="create-success" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;

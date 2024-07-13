import React from "react";
import { Redirect, Stack, Tabs } from "expo-router";
import { auth } from "@/firebase/firebaseConfig";

const Layout = () => {
  if (!auth.currentUser) return <Redirect href={"/(auth)"} />;
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="checkout" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;

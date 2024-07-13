import React from "react";
import { Redirect, Stack, Tabs } from "expo-router";
import { auth } from "@/firebase/firebaseConfig";

const Layout = () => {
  if (!auth.currentUser) return <Redirect href={"/(auth)"} />;
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen name="new" options={{ headerShown: false }} />
      <Stack.Screen name="edit/[id]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;

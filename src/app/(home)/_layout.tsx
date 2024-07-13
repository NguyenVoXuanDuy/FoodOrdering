import TabBar from "@/components/tab-bar/TabBar";
import { auth } from "@/firebase/firebaseConfig";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import "react-native-reanimated";
// Assuming TabBarIcon is in the same directory as _layout.tsx
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  if (!auth.currentUser) return <Redirect href={"/(auth)"} />;
  return (
    <Tabs screenOptions={{}} tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          headerShown: false,
        }}
      />

      <Tabs.Screen name="index" options={{ href: null }} />
    </Tabs>
  );
}

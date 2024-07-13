import { View, Text } from "react-native";
import React from "react";

import { Link, Redirect } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/types/type";
import { auth } from "@/firebase/firebaseConfig";

const index = () => {
  if (!auth.currentUser) {
    return <Redirect href={"/sign-in"} />;
  }

  return null;
};

export default index;

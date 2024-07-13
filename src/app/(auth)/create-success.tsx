import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import SuccessSvgIcon from "@assets/svg/SuccessSvgIcon";
import BackPreviousButton from "@/components/common/BackPreviousButton";

const CreateSuccess = () => {
  return (
    <SafeAreaView
      className="w-full h-full bg-white 
    flex flex-col justify-center items-center">
      <View className="absolute z-10 top-[70px] left-5 flex flex-row w-[92%] justify-between items-center">
        <BackPreviousButton backgroundColor="secondary" textColor="white" />
      </View>
      <Text className="text-3xl font-semibold text-green-600">
        Congratulations
      </Text>
      <Text className="text-2xl font-semibold mt-1 w-[65%] text-center mb-4 text-secondary ">
        You have successfully created your account
      </Text>
      <SuccessSvgIcon />
    </SafeAreaView>
  );
};

export default CreateSuccess;

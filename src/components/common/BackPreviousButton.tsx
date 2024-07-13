import { View, TouchableOpacity } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";
import { router } from "expo-router";

type BackPreviousButtonProps = {
  textColor: String | undefined;
  backgroundColor: String | undefined;
};
const BackPreviousButton = ({
  textColor,
  backgroundColor,
}: BackPreviousButtonProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.back();
      }}>
      <View
        className={`h-8 w-8 rounded-full bg-${backgroundColor} flex justify-center items-center`}>
        <Svg
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill={`${textColor}`}
          className="ml-[6px]">
          <Path d="M400-80L0-480l400-400 71 71-329 329 329 329-71 71z" />
        </Svg>
      </View>
    </TouchableOpacity>
  );
};

export default BackPreviousButton;

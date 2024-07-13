import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
type CommonButtonProps = {
  onPress: () => void;
  title: String;
  bgColor?: String;
  textColor?: String;
  textSize?: String;
  fontWeight?: String;
  isLoading?: boolean;
};

const CommonButton = ({
  onPress,
  title,
  bgColor = "bg-secondary",
  textColor = "text-white",
  textSize = "text-[16px]",
  fontWeight = "font-semibold",
  isLoading = false,
}: CommonButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={isLoading}>
      <View className="bg-secondary h-[52px]  flex flex-row rounded-xl items-center justify-center">
        <Text className="text-white text-[16px] font-semibold mr-2">
          {title}
        </Text>
        {isLoading && <Progress.CircleSnail size={27} color={["white"]} />}
      </View>
    </TouchableOpacity>
  );
};

export default CommonButton;

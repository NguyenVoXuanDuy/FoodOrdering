import React from "react";
import { View, Text } from "react-native";

type IconDisplayProps = {
  icon: React.ReactNode;
  content: string;
};
const IconDisplay = ({ icon, content }: IconDisplayProps) => {
  return (
    <View className="flex flex-row rounded-full items-center self-start mb-1">
      {icon}
      <Text className="ml-1 font-bold">{content}</Text>
    </View>
  );
};

export default IconDisplay;

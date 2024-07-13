import { View, Text, TextInput, KeyboardTypeOptions } from "react-native";
import React from "react";
type FormInputProps = {
  keyboardType?: KeyboardTypeOptions | null | undefined;
  title?: string;
  placeholder: string;
  isSecureTextEntry?: boolean;
  height?: number;
  multiline?: boolean;
  value?: string;
  onChangeText?: (e: string) => void;
};

const FormInput = ({
  value,
  height,
  keyboardType,
  title,
  placeholder,
  multiline,
  onChangeText,
  isSecureTextEntry = false,
}: FormInputProps) => {
  return (
    <View className="">
      {title && (
        <Text className="text-secondary font-semibold mb-1">{title}</Text>
      )}
      <View className="bg-gray-100 rounded-xl flex flex-row">
        <TextInput
          value={value}
          onChangeText={(e) => onChangeText && onChangeText(e)}
          multiline={multiline}
          keyboardType={keyboardType || "default"}
          secureTextEntry={isSecureTextEntry}
          placeholder={placeholder}
          // with out flex-1 the text input will not take the full width of the parent
          // even if seem like it is taking the full width
          //because parent is flex row and text input is not taking the full width
          // so flex-1 is necessary so that user touch area is increased
          className="p-5 flex-1 "
          placeholderTextColor="#9ca3af"
          style={{ height: height || 57 }}
        />
      </View>
    </View>
  );
};

export default FormInput;

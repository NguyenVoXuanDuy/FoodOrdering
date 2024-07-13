import { Keyboard, TouchableWithoutFeedback } from "react-native";

import React from "react";

const DismissKeyboard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default DismissKeyboard;

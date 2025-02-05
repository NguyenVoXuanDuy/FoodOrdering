import { useEffect, useState } from "react";

import { Keyboard, KeyboardEvent } from "react-native";

function useKeyboardHeight() {
  const [keyboardHeight, setKeyboardHeight] = useState<Number>(0);

  function onKeyboardShow(event: KeyboardEvent) {
    setKeyboardHeight(event.endCoordinates.height);
  }

  function onKeyboardHide() {
    setKeyboardHeight(0);
  }

  useEffect(() => {
    const onShow = Keyboard.addListener("keyboardDidShow", onKeyboardShow);
    const onHide = Keyboard.addListener("keyboardDidHide", onKeyboardHide);

    return () => {
      onShow.remove();
      onHide.remove();
    };
  }, []);

  return keyboardHeight;
}

export default useKeyboardHeight;

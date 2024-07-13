import * as React from "react";
import Svg, { Path } from "react-native-svg";

function TrashSvgIcon() {
  return (
    <Svg
      height="32px"
      viewBox="0 -960 960 960"
      width="32px"
      className="fill-secondary">
      <Path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280zm80-160h80v-360h-80v360zm160 0h80v-360h-80v360z" />
    </Svg>
  );
}

export default TrashSvgIcon;

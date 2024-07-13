import * as React from "react";
import Svg, { Path } from "react-native-svg";
type LogoutSvgIconProps = {
  color: string;
};
function LogoutSvgIcon({ color }: LogoutSvgIconProps) {
  return (
    <Svg height="24px" viewBox="0 -960 960 960" width="24px" fill={color}>
      <Path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200zm440-160l-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200z" />
    </Svg>
  );
}

export default LogoutSvgIcon;

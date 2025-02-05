import * as React from "react";
import Svg, { Path } from "react-native-svg";

function OrderSvgIcon({ color }: { color: string }) {
  return (
    <Svg height="24px" viewBox="0 0 24 24" width="24px" fill={color}>
      <Path d="M0 0h24v24H0V0z" fill="none" />
      <Path d="M11 7h6v2h-6zm0 4h6v2h-6zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7zM20.1 3H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM19 19H5V5h14v14z" />
    </Svg>
  );
}

export default OrderSvgIcon;

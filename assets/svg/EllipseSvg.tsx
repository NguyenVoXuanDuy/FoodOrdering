import * as React from "react";
import Svg, { Path } from "react-native-svg";

function EllipseSvg() {
  return (
    <Svg
      width={428}
      height={312}
      viewBox="0 0 428 312"
      fill="red"
      style={{
        position: "absolute",
        top: 0,
        left: -33,
      }}>
      <Path
        d="M459-33c0 32.174-6.337 164.033-18.65 193.757a244.996 244.996 0 01-399.591 79.484 244.996 244.996 0 01-53.11-79.484C-24.662 131.033-31-.826-31-33h490z"
        fill="#0a1120"
      />
    </Svg>
  );
}

export default EllipseSvg;

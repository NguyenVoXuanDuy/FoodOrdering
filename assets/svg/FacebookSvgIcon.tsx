import * as React from "react";
import Svg, { G, Rect, Path } from "react-native-svg";

function FacebookSvgIcon() {
  return (
    <Svg width={52} height={52} viewBox="0 0 193 193">
      <G transform="translate(-136 -677)">
        <Rect
          width={193}
          height={193}
          fill="#1778f2"
          rx={40}
          transform="translate(136 677)"
        />
        <Path
          fill="#fdfdfd"
          d="M240.195 827.969v-51.655h17.339l2.6-20.131h-19.939V743.33c0-5.828 1.619-9.8 9.977-9.8h10.66v-18a142.87 142.87 0 00-15.534-.792c-15.37 0-25.892 9.381-25.892 26.61v14.835h-17.383v20.131h17.383v51.655h20.789z"
        />
      </G>
    </Svg>
  );
}

export default FacebookSvgIcon;

import React from "react";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";

const ProductLoadingSkeletonSvg = () => (
  <ContentLoader
    speed={0.8}
    width={300}
    height={100}
    viewBox="0 0 300 100"
    backgroundColor="#9ca3af"
    foregroundColor="#f3f4f6">
    <Rect x="84" y="20" rx="3" ry="3" width="200" height="7" />
    <Rect x="85" y="43" rx="3" ry="3" width="100" height="7" />
    <Circle cx="37" cy="36" r="34" />
  </ContentLoader>
);

export default ProductLoadingSkeletonSvg;

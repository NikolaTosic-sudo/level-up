import { Spin } from "antd";
import type { CSSProperties } from "react";

type LoadingComponentProps = {
  style?: CSSProperties;
};

function LoadingComponent({ style }: LoadingComponentProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <Spin size="large" />
    </div>
  );
}

export default LoadingComponent;

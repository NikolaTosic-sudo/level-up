import type React from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

type HelperComponentProps = {
  text: string;
  iconStyle?: React.CSSProperties;
};

function HelperComponent({ text, iconStyle }: HelperComponentProps) {
  return (
    <Tooltip title={text}>
      <QuestionCircleOutlined
        className="pointer"
        style={{
          fontSize: 10,
          top: 0,
          right: 0,
          position: "absolute",
          ...iconStyle,
        }}
      />
    </Tooltip>
  );
}

export default HelperComponent;

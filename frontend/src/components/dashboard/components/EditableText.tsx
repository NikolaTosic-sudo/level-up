import { EditOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import type { CSSProperties, ReactNode } from "react";

type EditableTextProps = {
  title?: string;
  content: ReactNode;
  onChange?: (value: string) => void;
  editable?: boolean;
  style?: CSSProperties;
};

function EditableText({
  title,
  content,
  onChange,
  editable,
  style,
}: EditableTextProps) {
  return (
    <div>
      {title ? <span style={{ fontWeight: "bold" }}>{title}</span> : null}
      <Typography.Paragraph
        editable={
          editable
            ? {
                onChange, // TODO: Connect onChange with api
                icon: (
                  <EditOutlined style={{ color: "rgba(0, 255, 255, 0.55)" }} />
                ),
              }
            : false
        }
        className="space-between align-center"
        style={{ display: "inline-flex", marginLeft: 12, ...style }}
      >
        {content}
      </Typography.Paragraph>
    </div>
  );
}

export default EditableText;

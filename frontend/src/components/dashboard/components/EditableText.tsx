import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, Space, Typography } from "antd";
import dayjs from "dayjs";
import { useState, type CSSProperties } from "react";

type EditableTextProps = {
  title?: string;
  onChange?: (value: string, e?: MouseEvent) => void;
  editable?: boolean;
  style?: CSSProperties;
  mode?: "input" | "textArea" | "date";
  val?: string;
};

function EditableText({
  title,
  editable,
  onChange,
  style,
  val,
  mode = "input",
}: EditableTextProps) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(val);

  const handleOk = () => {
    setEditing(false);
    if (onChange && value) {
      onChange(value);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setValue(val);
  };

  return (
    <div style={{ marginBottom: 8 }}>
      {title ? <span style={{ fontWeight: "bold" }}>{title}</span> : null}

      {editing ? (
        <Space.Compact style={{ marginLeft: 12 }}>
          <RenderInput mode={mode} val={value} change={setValue} />
          <Button
            icon={<CloseOutlined />}
            danger
            type="primary"
            onClick={handleCancel}
          />
          <Button icon={<CheckOutlined />} type="primary" onClick={handleOk} />
        </Space.Compact>
      ) : (
        <>
          <Typography.Paragraph
            className="space-between align-center"
            style={{
              display: "inline-flex",
              marginLeft: 12,
              ...style,
            }}
          >
            {val}
          </Typography.Paragraph>
          {editable ? (
            <EditOutlined
              onClick={() => setEditing(true)}
              style={{
                color: "rgba(0, 255, 255, 0.55)",
                marginLeft: 8,
              }}
            />
          ) : null}{" "}
        </>
      )}
    </div>
  );
}

export default EditableText;

function RenderInput({
  mode,
  val,
  change,
  style,
}: Partial<EditableTextProps> & { change: (val: string) => void }) {
  return mode === "input" ? (
    <Input value={val} style={style} onChange={(e) => change(e.target.value)} />
  ) : mode === "textArea" ? (
    <Input.TextArea
      autoSize
      value={val}
      onChange={(e) => change(e.target.value)}
      style={style}
    />
  ) : mode === "date" ? (
    <DatePicker
      style={style}
      value={dayjs(val)}
      onChange={(_date, dateString) =>
        typeof dateString === "string" ? change(dateString) : null
      }
    />
  ) : null;
}

import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, Space, Typography } from "antd";
import dayjs from "dayjs";
import { useState, type CSSProperties } from "react";

type EditableTextProps = {
  title?: string;
  onChange?: (value: string, e?: MouseEvent) => void;
  editable?: boolean;
  style?: CSSProperties;
  spaceStyle?: CSSProperties;
  mode?: "input" | "textArea" | "date";
  val?: string;
  placeholder?: string;
};

function EditableText({
  title,
  editable,
  onChange,
  style,
  spaceStyle,
  val,
  placeholder,
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
        <Space.Compact style={{ marginLeft: title ? 12 : 0, ...spaceStyle }}>
          <RenderInput
            style={style}
            mode={mode}
            placeholder={placeholder}
            val={value}
            change={setValue}
          />
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
              marginLeft: title ? 12 : 0,
              ...style,
            }}
          >
            {val ? val : placeholder}
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
  placeholder,
}: Partial<EditableTextProps> & { change: (val: string) => void }) {
  return mode === "input" ? (
    <Input
      placeholder={placeholder}
      value={val}
      style={style}
      onChange={(e) => change(e.target.value)}
    />
  ) : mode === "textArea" ? (
    <Input.TextArea
      autoSize
      value={val}
      onChange={(e) => change(e.target.value)}
      style={style}
      placeholder={placeholder}
    />
  ) : mode === "date" ? (
    <DatePicker
      style={style}
      value={dayjs(val)}
      placeholder={placeholder}
      onChange={(_date, dateString) =>
        typeof dateString === "string" ? change(dateString) : null
      }
    />
  ) : null;
}

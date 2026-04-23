import { Space, Tag, Typography } from "antd";
import type { MouseEvent } from "react";

type SkillRendererProps = {
  vertical?: boolean;
  wrap?: boolean;
  value?: string[];
  onChange?: (value: string[]) => void;
};

const SkillRenderer = ({
  vertical = true,
  wrap = false,
  value,
  onChange,
}: SkillRendererProps) => {
  if (!value) {
    return null;
  }

  function handleClose(
    e: MouseEvent<HTMLElement, globalThis.MouseEvent>,
    idx: number,
  ) {
    e.preventDefault();
    if (value && onChange) {
      const newSkills = [...value];
      newSkills.splice(idx, 1);
      onChange(newSkills);
    }
  }

  return (
    <Space wrap={wrap} vertical={vertical}>
      {value.map((s, index) => (
        <Tag
          closable
          color="#008c95"
          variant="solid"
          onClose={(e) => handleClose(e, index)}
          className="skills"
        >
          <Typography.Paragraph
            ellipsis={{ tooltip: true }}
            style={{ maxWidth: 140 }}
          >
            {s}
          </Typography.Paragraph>
        </Tag>
      ))}
    </Space>
  );
};

export default SkillRenderer;

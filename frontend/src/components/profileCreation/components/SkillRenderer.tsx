import { Space, Tag, Typography } from "antd";
import type { MouseEvent } from "react";
import type { MainSkill } from "../../../api";

type SkillRendererProps = {
  vertical?: boolean;
  wrap?: boolean;
  value?: MainSkill[];
  onChange?: (value: MainSkill[]) => void;
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
      {value
        ? value.map((s, index) => (
            <Tag
              key={s.name}
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
                {s.name}
              </Typography.Paragraph>
            </Tag>
          ))
        : null}
    </Space>
  );
};

export default SkillRenderer;

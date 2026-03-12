import { Form, Space, Tag, Typography } from "antd";
import type { MouseEvent } from "react";

type SkillRendererProps = {
  skills: string[];
};

const SkillRenderer = ({ skills }: SkillRendererProps) => {
  const formInstance = Form.useFormInstance();

  function handleClose(
    e: MouseEvent<HTMLElement, globalThis.MouseEvent>,
    idx: number,
  ) {
    e.preventDefault();
    const newSkills = [...skills];
    newSkills.splice(idx, 1);
    formInstance.setFieldValue("skills", newSkills);
  }

  return (
    <Space vertical>
      {skills.map((s, index) => (
        <Tag
          closable
          color="#008c95"
          variant="solid"
          onClose={(e) => handleClose(e, index)}
          className="skills"
        >
          <Typography.Paragraph ellipsis={true} style={{ maxWidth: 140 }}>
            {s}
          </Typography.Paragraph>
        </Tag>
      ))}
    </Space>
  );
};

export default SkillRenderer;

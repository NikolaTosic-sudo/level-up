import { Form, Space, Tag } from "antd";
import type { MouseEvent } from "react";

type SkillRendererProps = {
  skills: string[];
};

const SkillRenderer = ({ skills }: SkillRendererProps) => {
  const formInstance = Form.useFormInstance();
  console.log(skills, "skills");

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
        <Tag closable onClose={(e) => handleClose(e, index)}>
          {s}
        </Tag>
      ))}
    </Space>
  );
};

export default SkillRenderer;

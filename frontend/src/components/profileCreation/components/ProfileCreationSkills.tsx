import { Flex, Form } from "antd";
import SelectSkills from "./SelectSkills";
import SkillRenderer from "./SkillRenderer";

export const ProfileCreationSkills = () => {
  const formInstance = Form.useFormInstance();
  const skills = Form.useWatch("skills", formInstance);

  return (
    <Flex
      className="profile-creation-main"
      justify={skills && skills.length ? "space-between" : "center"}
    >
      <Form.Item name="skills">
        <SkillRenderer />
      </Form.Item>
      <SelectSkills />
    </Flex>
  );
};

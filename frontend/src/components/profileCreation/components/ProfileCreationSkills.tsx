import { Flex, Form } from "antd";
import SelectSkills from "./SelectSkills";
import SkillRenderer from "./SkillRenderer";

export const ProfileCreationSkills = () => {
  const formInstance = Form.useFormInstance();
  const skills = Form.useWatch("skills", formInstance);

  return (
    <Flex
      className="profile-creation-main"
      justify={skills ? "space-between" : "center"}
    >
      <SkillRenderer skills={skills ?? []} />
      <Form.Item name="skills" hidden />
      <SelectSkills />
    </Flex>
  );
};

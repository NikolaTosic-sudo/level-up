import { Flex } from "antd";
import skills from "./skills.json";
import SkillWrap from "./SkillWrap";
import NewSkillWrapper from "./NewSkillWrapper";

function SkillsWrapper() {
  return (
    <>
      <NewSkillWrapper />
      <Flex gap={16} wrap style={{ marginTop: 16 }}>
        {skills.map((s) => (
          <SkillWrap key={s.id} skill={s} />
        ))}
      </Flex>
    </>
  );
}

export default SkillsWrapper;

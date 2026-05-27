import { Flex } from "antd";
import SkillWrap from "./SkillWrap";
import NewSkillWrapper from "./NewSkillWrapper";
import type { MainSkill } from "../../../api";

type SkillsWrapperProps = {
  skills?: MainSkill[];
};

function SkillsWrapper({ skills }: SkillsWrapperProps) {
  return (
    <>
      <NewSkillWrapper />
      {skills ? (
        <Flex gap={16} wrap style={{ marginTop: 16 }}>
          {skills.map((s) => (
            <SkillWrap key={s.name} skill={s} />
          ))}
        </Flex>
      ) : null}
    </>
  );
}

export default SkillsWrapper;

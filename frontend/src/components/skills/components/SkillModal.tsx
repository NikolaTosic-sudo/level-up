import { useTranslation } from "react-i18next";
import ModalComponent from "../../common/ModalComponent";
import SkillForm from "./SkillForm";
import { Divider, Flex, Progress } from "antd";

export type Skill = {
  id: string;
  name: string;
  level: number;
  experience: number;
  experienceNeeded: number;
  linkedSkills?: Array<string>;
};

type SkillModalProps = {
  skill: Skill;
};

function SkillModal({ skill }: SkillModalProps) {
  const { t } = useTranslation();

  return (
    <ModalComponent
      buttonInner={<ModalInnerButton skill={skill} />}
      cancelButtonProps={{ danger: true, type: "primary" }}
      okText={t("", { defaultValue: "Save" })}
      buttonProps={{
        type: "primary",
        ghost: true,
      }}
      buttonTooltip={t("", { defaultValue: "Click for more info" })}
      destroyOnHidden
    >
      <SkillForm skill={skill} />
    </ModalComponent>
  );
}

export default SkillModal;

function ModalInnerButton({ skill }: SkillModalProps) {
  return (
    <Flex align="center">
      <span style={{ color: "white" }}>{skill.name}</span>
      <Divider vertical style={{ marginBlock: -12 }} />
      <Progress
        showInfo={false}
        percent={(skill.experience / skill.experienceNeeded) * 100}
        strokeColor="#008c95"
        style={{ minWidth: 60 }}
      />
      <span style={{ marginLeft: 6, color: "white" }}>{skill.level}</span>
    </Flex>
  );
}

import { useTranslation } from "react-i18next";
import ModalComponent from "../../common/ModalComponent";
import SkillForm from "./SkillForm";

export type Skill = {
  id: string;
  name: string;
  linkedSkills?: Array<string>;
};

type SkillModalProps = {
  skill: Skill;
};

function SkillModal({ skill }: SkillModalProps) {
  const { t } = useTranslation();

  return (
    <ModalComponent
      buttonInner={skill.name}
      cancelButtonProps={{ danger: true, type: "primary" }}
      okText={t("", { defaultValue: "Save" })}
      buttonProps={{
        type: "primary",
        ghost: true,
        styles: {
          content: {
            color: "#fff",
          },
        },
      }}
      buttonTooltip={t("", { defaultValue: "Click for more info" })}
      destroyOnHidden
    >
      <SkillForm skill={skill} />
    </ModalComponent>
  );
}

export default SkillModal;

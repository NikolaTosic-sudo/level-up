import { useTranslation } from "react-i18next";
import ModalComponent from "../../common/ModalComponent";
import SkillForm from "./SkillForm";
import { EditOutlined } from "@ant-design/icons";

export type Skill = {
  id: string;
  name: string;
  level: number;
  experience: number;
  experienceNeeded: number;
  linkedSkills?: Array<Skill>;
};

type SkillModalProps = {
  skill: Skill;
};

function SkillModal({ skill }: SkillModalProps) {
  const { t } = useTranslation();

  return (
    <ModalComponent
      buttonInner={""}
      okText={t("skill.modal.save", { defaultValue: "Save" })}
      buttonProps={{
        type: "primary",
        ghost: true,
        style: { fontSize: 10, height: 20, width: 20 },
        icon: <EditOutlined />,
      }}
      buttonTooltip={t("skill.modal.edit", { defaultValue: "Edit skill" })}
      destroyOnHidden
    >
      <SkillForm skill={skill} />
    </ModalComponent>
  );
}

export default SkillModal;

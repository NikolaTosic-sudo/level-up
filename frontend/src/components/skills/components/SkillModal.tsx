import { useTranslation } from "react-i18next";
import ModalComponent from "../../common/ModalComponent";
import SkillForm from "./SkillForm";

type SkillModalProps = {
  name: string;
};

function SkillModal({ name }: SkillModalProps) {
  const { t } = useTranslation();

  return (
    <ModalComponent
      buttonInner={name}
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
      <SkillForm skillName={name} />
    </ModalComponent>
  );
}

export default SkillModal;

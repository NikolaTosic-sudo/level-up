import { useTranslation } from "react-i18next";
import ModalComponent from "../../common/ModalComponent";

type SkillProps = {
  name: string;
};

function Skill({ name }: SkillProps) {
  const { t } = useTranslation();

  return (
    <ModalComponent
      buttonInner={name}
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
    >
      {name}
    </ModalComponent>
  );
}

export default Skill;

import { Card } from "antd";
import { useTranslation } from "react-i18next";
import EditableText from "./EditableText";

function SkillsCard() {
  const { t } = useTranslation();

  return (
    <Card title={t("", { defaultValue: "Skills" })}>
      <EditableText
        title={t("", { defaultValue: "Skill with the highest level:" })}
        val={"Development"}
      />

      <EditableText
        title={t("", { defaultValue: "Most recently leveled-up skill:" })}
        val={"Development"}
      />
    </Card>
  );
}

export default SkillsCard;

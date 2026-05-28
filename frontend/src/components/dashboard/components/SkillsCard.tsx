import { Card } from "antd";
import { useTranslation } from "react-i18next";
import EditableText from "./EditableText";

type SkillsCardProps = {
  stats: {
    highest?: string;
    recent?: string;
  };
};

function SkillsCard({ stats }: SkillsCardProps) {
  const { t } = useTranslation();

  return (
    <Card title={t("", { defaultValue: "Skills" })}>
      <EditableText
        title={t("", { defaultValue: "Skill with the highest level:" })}
        val={stats.highest}
      />

      <EditableText
        title={t("", { defaultValue: "Most recently leveled-up skill:" })}
        val={stats.recent}
      />
    </Card>
  );
}

export default SkillsCard;

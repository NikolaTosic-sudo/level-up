import { Card } from "antd";
import { useTranslation } from "react-i18next";

function SkillsCard() {
  const { t } = useTranslation();

  return <Card title={t("", { defaultValue: "Skills" })} />;
}

export default SkillsCard;

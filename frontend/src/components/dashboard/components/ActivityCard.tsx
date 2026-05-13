import { Card } from "antd";
import { useTranslation } from "react-i18next";

function ActivityCard() {
  const { t } = useTranslation();

  return <Card title={t("", { defaultValue: "Activity" })} />;
}

export default ActivityCard;

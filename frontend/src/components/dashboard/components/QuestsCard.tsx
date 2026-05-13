import { Card } from "antd";
import { useTranslation } from "react-i18next";

function QuestsCard() {
  const { t } = useTranslation();

  return <Card title={t("", { defaultValue: "Quests" })} />;
}

export default QuestsCard;

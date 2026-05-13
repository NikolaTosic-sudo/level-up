import { Card } from "antd";
import { useTranslation } from "react-i18next";

function BioCard() {
  const { t } = useTranslation();

  return <Card title={t("", { defaultValue: "Bio" })} />;
}

export default BioCard;

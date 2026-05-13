import { Card } from "antd";
import { useTranslation } from "react-i18next";

function ProfileCard() {
  const { t } = useTranslation();

  return <Card title={t("", { defaultValue: "Profile" })} />;
}

export default ProfileCard;

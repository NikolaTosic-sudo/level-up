import { Card } from "antd";
import { useTranslation } from "react-i18next";
import EditableText from "./EditableText";

function ProfileCard() {
  const { t } = useTranslation();

  return (
    <Card title={t("", { defaultValue: "Profile" })}>
      <EditableText
        title={t("", { defaultValue: "Name:" })}
        content={"Nikola Tosic"}
        onChange={(value) => console.log(value, "value name")}
        editable
      />

      <EditableText
        title={t("", { defaultValue: "Email:" })}
        content={"toleslaoffice@gmail.com"}
        onChange={(value) => console.log(value, "value name")}
        editable
      />

      <EditableText
        title={t("", { defaultValue: "Nickname:" })}
        content={"Krdzina"}
        onChange={(value) => console.log(value, "value name")}
        editable
      />

      <EditableText
        title={t("", { defaultValue: "Date of Birth:" })}
        content={"Krdzina"}
        onChange={(value) => console.log(value, "value name")}
        editable
      />
    </Card>
  );
}

export default ProfileCard;

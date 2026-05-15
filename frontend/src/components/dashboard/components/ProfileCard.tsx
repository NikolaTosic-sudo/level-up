import { Card } from "antd";
import { useTranslation } from "react-i18next";
import EditableText from "./EditableText";

function ProfileCard() {
  const { t } = useTranslation();

  return (
    <Card title={t("", { defaultValue: "Profile" })}>
      <EditableText
        title={t("", { defaultValue: "Name:" })}
        val={"Nikola Tosic"}
        onChange={(value) => console.log(value, "value name")}
        editable
      />

      <EditableText
        title={t("", { defaultValue: "Email:" })}
        val={"toleslaoffice@gmail.com"}
        onChange={(value) => console.log(value, "value name")}
        editable
      />

      <EditableText
        title={t("", { defaultValue: "Nickname:" })}
        val={"Krdzina"}
        onChange={(value) => console.log(value, "value name")}
        editable
      />

      <EditableText
        title={t("", { defaultValue: "Date of Birth:" })}
        val={"1997-09-07"}
        onChange={(value) => console.log(value, "value name")}
        editable
        mode="date"
      />
    </Card>
  );
}

export default ProfileCard;

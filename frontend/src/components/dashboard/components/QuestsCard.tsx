import { Card } from "antd";
import { useTranslation } from "react-i18next";
import EditableText from "./EditableText";

function QuestsCard() {
  const { t } = useTranslation();

  return (
    <Card title={t("", { defaultValue: "Quests" })}>
      <EditableText
        title={t("", { defaultValue: "Quests completed:" })}
        val={"8"}
      />

      <EditableText
        title={t("", { defaultValue: "Repeating quests completed:" })}
        val={"8"}
      />

      <EditableText
        title={t("", { defaultValue: "Custom quests completed:" })}
        val={"8"}
      />

      <EditableText
        title={t("", { defaultValue: "Experience gained:" })}
        val={"8"}
      />
    </Card>
  );
}

export default QuestsCard;

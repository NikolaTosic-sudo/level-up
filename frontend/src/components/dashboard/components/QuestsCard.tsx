import { Card } from "antd";
import { useTranslation } from "react-i18next";
import EditableText from "./EditableText";

function QuestsCard() {
  const { t } = useTranslation();

  return (
    <Card title={t("", { defaultValue: "Quests" })}>
      <EditableText
        title={t("", { defaultValue: "Quests completed:" })}
        content={"8"}
      />

      <EditableText
        title={t("", { defaultValue: "Repeating quests completed:" })}
        content={"8"}
      />

      <EditableText
        title={t("", { defaultValue: "Custom quests completed:" })}
        content={"8"}
      />

      <EditableText
        title={t("", { defaultValue: "Experience gained:" })}
        content={"8"}
      />
    </Card>
  );
}

export default QuestsCard;

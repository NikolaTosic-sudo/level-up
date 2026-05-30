import { Card } from "antd";
import { useTranslation } from "react-i18next";
import EditableText from "./EditableText";
import type { MainQuestStatsResponse } from "../../../api";

type QuestsCardProps = {
  questStats?: MainQuestStatsResponse;
};

function QuestsCard({ questStats }: QuestsCardProps) {
  const { t } = useTranslation();

  return (
    <Card title={t("", { defaultValue: "Quests" })}>
      <EditableText
        title={t("", { defaultValue: "Quests completed:" })}
        val={questStats?.questCompleted}
      />

      <EditableText
        title={t("", { defaultValue: "Repeating quests completed:" })}
        val={questStats?.repeatingQuestCompleted}
      />

      <EditableText
        title={t("", { defaultValue: "Custom quests completed:" })}
        val={questStats?.customQuestCompleted}
      />

      <EditableText
        title={t("", { defaultValue: "Sub-quests completed:" })}
        val={questStats?.subQuestsCompleted}
      />

      <EditableText
        title={t("", { defaultValue: "Experience gained:" })}
        val={questStats?.experienceGained}
      />
    </Card>
  );
}

export default QuestsCard;

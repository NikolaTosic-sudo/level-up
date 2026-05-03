import { Descriptions } from "antd";
import type { Quest } from "./Quest";
import type { DescriptionsItemProps } from "antd/es/descriptions/Item";
import { useTranslation } from "react-i18next";

type QuestDescrptionProps = {
  quest: Quest;
};

function QuestDescrption({ quest }: QuestDescrptionProps) {
  const { t } = useTranslation();

  const items: DescriptionsItemProps[] = [
    {
      label: t("", { defaultValue: "Experience to be gained" }),
      children: quest.experience,
    },
  ];

  return <Descriptions title={quest.title} items={items} />;
}

export default QuestDescrption;

import { Descriptions } from "antd";
import type { Quest } from "./Quest";
import type { DescriptionsItemProps } from "antd/es/descriptions/Item";

type QuestDescrptionProps = {
  quest: Quest;
};

function QuestDescrption({ quest }: QuestDescrptionProps) {
  const items: DescriptionsItemProps[] = [
    {
      label: "Experience to be gained",
      children: quest.experience,
    },
  ];

  return <Descriptions title={quest.title} items={items} />;
}

export default QuestDescrption;

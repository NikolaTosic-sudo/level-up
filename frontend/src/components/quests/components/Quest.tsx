import { Collapse, Divider, Flex, Progress, Typography } from "antd";
import QuestDescrption from "./QuestDescription";
import QuestExtra from "./QuestExtra";
import type { MainCustomQuest, MainRepeatingQuest } from "../../../api";
import { useTranslation } from "react-i18next";
import { CheckCircleOutlined } from "@ant-design/icons";

type QuestProps = {
  title?: string;
  custom?: boolean;
  quests?: Array<MainRepeatingQuest> | Array<MainCustomQuest>;
};

function Quest({ title, quests }: QuestProps) {
  const { t } = useTranslation();

  const items = quests?.map((q) => ({
    key: q.id,
    label: <QuestHeader quest={q} />,
    children: <QuestDescrption quest={q} />,
    extra: <QuestExtra quest={q} />,
  }));

  return (
    <>
      {title ? (
        <Divider titlePlacement="start">
          <Typography.Title level={4}>{t(`type.${title}`)}</Typography.Title>
        </Divider>
      ) : null}
      <Collapse items={items} />
    </>
  );
}

export default Quest;

function QuestHeader({
  quest,
}: {
  quest: MainRepeatingQuest | MainCustomQuest;
}) {
  return (
    <Flex align="center" gap={24}>
      <Typography.Title
        level={5}
        italic={quest.completed}
        delete={quest.completed}
      >
        {quest.name}
      </Typography.Title>
      {quest.subQuests && quest.subQuests.length && (
        <>
          <Progress
            showInfo={false}
            percent={
              ((quest.subQuestsCompleted ?? 0) / quest.subQuests.length) * 100
            }
            strokeColor="#008c95"
          />

          {quest.completed ? (
            <CheckCircleOutlined style={{ color: "#008c95", fontSize: 20 }} />
          ) : (
            <span>
              {quest.subQuestsCompleted ?? 0} / {quest.subQuests.length}
            </span>
          )}
        </>
      )}
    </Flex>
  );
}

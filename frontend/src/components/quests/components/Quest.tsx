import { Collapse, Divider, Flex, Progress, Typography } from "antd";
import type { Skill } from "../../skills/components/SkillModal";
import QuestDescrption from "./QuestDescription";
import QuestExtra from "./QuestExtra";
import { CheckCircleOutlined } from "@ant-design/icons";

export type Quest = {
  id: number;
  title: string;
  skills?: Array<Skill>;
  completed?: boolean;
  subQuestsCompleted?: number;
  experience: number;
  subTasks?: Array<Quest>;
};

type QuestProps = {
  title: string;
  quests: Array<Quest>;
};

function Quest({ title, quests }: QuestProps) {
  const items = quests.map((q) => ({
    key: q.id,
    label: <QuestHeader quest={q} />,
    children: <QuestDescrption quest={q} />,
    extra: <QuestExtra quest={q} />,
  }));

  return (
    <>
      <Divider titlePlacement="start">
        <Typography.Title level={4}>{title}</Typography.Title>
      </Divider>

      <Collapse items={items} />
    </>
  );
}

export default Quest;

function QuestHeader({ quest }: { quest: Quest }) {
  return (
    <Flex align="center" gap={24}>
      <Typography.Title
        level={5}
        italic={quest.completed}
        delete={quest.completed}
      >
        {quest.title}
      </Typography.Title>
      {quest.subTasks && quest.subTasks.length && (
        <>
          <Progress
            showInfo={false}
            percent={
              ((quest.subQuestsCompleted ?? 0) / quest.subTasks.length) * 100
            }
            strokeColor="#008c95"
          />

          {quest.completed ? (
            <CheckCircleOutlined style={{ color: "#008c95", fontSize: 20 }} />
          ) : (
            <span>
              {quest.subQuestsCompleted ?? 0} / {quest.subTasks.length}
            </span>
          )}
        </>
      )}
    </Flex>
  );
}

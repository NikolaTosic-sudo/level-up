import { Button, Card, Descriptions, Flex, Popconfirm } from "antd";
import type { Quest } from "./Quest";
import type { DescriptionsItemProps } from "antd/es/descriptions/Item";
import { useTranslation } from "react-i18next";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";

type QuestDescrptionProps = {
  quest: Quest;
};

function QuestDescrption({ quest }: QuestDescrptionProps) {
  const { t } = useTranslation();

  const items: DescriptionsItemProps[] = [
    {
      label: t("quest.description.subquests", {
        defaultValue: "Sub-Quests",
      }),
      children: quest?.subTasks?.map((q) => (
        <Card
          variant="borderless"
          title={<h5>{q.title}</h5>}
          extra={
            <Flex gap={16}>
              <Popconfirm
                title={t("quest.subquest.confirm.done", {
                  defaultValue: "Are you done with this sub-quest?",
                })}
              >
                <Button
                  variant="outlined"
                  color="green"
                  ghost
                  icon={<CheckOutlined style={{ fontSize: 12 }} />}
                  onClick={(e) => e.stopPropagation()}
                />
              </Popconfirm>
              <Popconfirm
                title={t("quest.subquest.confirm.delete", {
                  defaultValue:
                    "Are you sure you want to delete this sub-quest?",
                })}
              >
                <Button
                  ghost
                  danger
                  icon={<DeleteOutlined style={{ fontSize: 12 }} />}
                  onClick={(e) => e.stopPropagation()}
                />
              </Popconfirm>
            </Flex>
          }
        />
      )),
      span: 3,
      style: quest.subTasks && quest.subTasks.length ? {} : { display: "none" },
      styles: { content: { width: "100%", display: "block" } },
    },
    {
      label: t("quest.description.exp", {
        defaultValue: "Experience to be gained",
      }),
      children: quest.experience,
    },
    {
      label: t("quest.description.skills", {
        defaultValue: "Skills to be improved",
      }),
      children: quest.skills?.map((s) => s.name).join(", "),
      style: quest.skills && quest.skills.length ? {} : { display: "none" },
    },
  ];

  return (
    <Descriptions
      layout="vertical"
      column={3}
      title={quest.title}
      items={items}
    />
  );
}

export default QuestDescrption;

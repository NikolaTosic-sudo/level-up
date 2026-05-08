import { Button, Card, Descriptions, Flex, Typography } from "antd";
import type { Quest } from "./Quest";
import type { DescriptionsItemProps } from "antd/es/descriptions/Item";
import { useTranslation } from "react-i18next";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import PopconfirmComponent from "../../common/PopconfirmComponent";

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
      children: quest?.subQuests?.map((q) => (
        <Card
          variant="borderless"
          title={
            <Typography.Title
              level={5}
              italic={q.completed}
              delete={q.completed}
            >
              {q.title}
            </Typography.Title>
          }
          extra={
            q.completed ? (
              <Typography.Text italic>
                {t("quest.status.completed", {
                  defaultValue: "Completed",
                })}
              </Typography.Text>
            ) : (
              <Flex gap={16}>
                <PopconfirmComponent
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
                </PopconfirmComponent>
                <PopconfirmComponent
                  cancelButtonProps={{ type: "primary", danger: true }}
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
                </PopconfirmComponent>
              </Flex>
            )
          }
        />
      )),
      span: 3,
      style:
        quest.subQuests && quest.subQuests.length ? {} : { display: "none" },
      styles: { content: { width: "100%", display: "block" } },
    },
    {
      label: quest.completed
        ? t("quest.description.expCompleted", {
            defaultValue: "Experience gained",
          })
        : t("quest.description.exp", {
            defaultValue: "Experience to be gained",
          }),
      children: quest.experience,
    },
    {
      label: quest.completed
        ? t("quest.description.skillsCompleted", {
            defaultValue: "Skills improved",
          })
        : t("quest.description.skills", {
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

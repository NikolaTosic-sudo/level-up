import { Button, Card, Descriptions, Flex, Typography } from "antd";
import type { DescriptionsItemProps } from "antd/es/descriptions/Item";
import { useTranslation } from "react-i18next";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import PopconfirmComponent from "../../common/PopconfirmComponent";
import type { MainCustomQuest, MainRepeatingQuest } from "../../../api";
import { useCompleteSubQuest } from "../hooks/useCompleteSubQuest";
import { useDeleteSubQuest } from "../hooks/useDeleteSubQuest";

type QuestDescrptionProps = {
  quest: MainRepeatingQuest | MainCustomQuest;
};

function QuestDescrption({ quest }: QuestDescrptionProps) {
  const { t } = useTranslation();

  const { mutate: finishSubQuest } = useCompleteSubQuest();

  const { mutate: deleteSubQuest } = useDeleteSubQuest();

  const handleFinish = (id: number) => {
    finishSubQuest(id);
  };

  const handleDelete = (id: number) => {
    deleteSubQuest(id);
  };

  const items: DescriptionsItemProps[] = [
    {
      label: t("quest.description.subquests", {
        defaultValue: "Sub-Quests",
      }),
      children: quest?.subQuests?.map((q) => (
        <Card
          variant="borderless"
          title={
            <Flex gap={64} align="end">
              <Typography.Title
                level={5}
                italic={q.completed}
                delete={q.completed}
              >
                {q.name}
              </Typography.Title>

              <Typography.Text
                italic={q.completed}
                delete={q.completed}
                style={{ fontSize: 12, fontWeight: "normal" }}
              >
                Exp: {q.experience}
              </Typography.Text>
            </Flex>
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
                  onConfirm={() => handleFinish(q.id ?? 0)}
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
                  title={t("quest.subquest.confirm.delete", {
                    defaultValue:
                      "Are you sure you want to delete this sub-quest?",
                  })}
                  onConfirm={() => handleDelete(q.id ?? 0)}
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
    {
      label: t("quest.description.startDate", {
        defaultValue: "Quest start date",
      }),
      children: "startDate" in quest && quest.startDate,
      style: "startDate" in quest && quest.startDate ? {} : { display: "none" },
    },
    {
      label: t("quest.description.endDate", {
        defaultValue: "Quest end date",
      }),
      children: "endDate" in quest && quest.endDate,
      style: "endDate" in quest && quest.endDate ? {} : { display: "none" },
    },
  ];

  return (
    <Descriptions
      layout="vertical"
      column={3}
      title={quest.name}
      items={items}
    />
  );
}

export default QuestDescrption;

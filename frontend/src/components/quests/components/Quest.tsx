import { Button, Collapse, Divider, Flex, Popconfirm, Typography } from "antd";
import ModalComponent from "../../common/ModalComponent";
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { Skill } from "../../skills/components/SkillModal";
import { useTranslation } from "react-i18next";
import QuestDescrption from "./QuestDescription";

export type Quest = {
  id: number;
  title: string;
  skills?: Array<Skill>;
  experience: number;
};

type QuestProps = {
  title: string;
  quests: Array<Quest>;
};

function Quest({ title, quests }: QuestProps) {
  const { t } = useTranslation();

  const items = quests.map((q) => ({
    key: q.id,
    label: q.title,
    children: <QuestDescrption quest={q} />,
    extra: (
      <Flex gap={8}>
        <Popconfirm
          title={t("", {
            defaultValue: "Are you done with this Quest?",
          })}
        >
          <Button
            variant="outlined"
            color="green"
            ghost
            icon={<CheckOutlined />}
            onClick={(e) => e.stopPropagation()}
          />
        </Popconfirm>
        <ModalComponent
          buttonInner=""
          buttonProps={{ type: "primary", icon: <EditOutlined /> }}
        >
          Edit
        </ModalComponent>
        <Popconfirm
          title={t("", {
            defaultValue: "Are you sure you want to delete this quest?",
          })}
        >
          <Button
            ghost
            danger
            icon={<DeleteOutlined />}
            onClick={(e) => e.stopPropagation()}
          />
        </Popconfirm>
      </Flex>
    ),
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

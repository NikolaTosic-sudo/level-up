import { Button, Collapse, Divider, Flex, Typography } from "antd";
import ModalComponent from "../../common/ModalComponent";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { Skill } from "../../skills/components/SkillModal";

type Quest = {
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
  const items = quests.map((q) => ({
    key: q.id,
    label: q.title,
    children: <div>Description</div>,
    extra: (
      <Flex gap={8}>
        <ModalComponent
          buttonInner=""
          buttonProps={{ type: "primary", icon: <EditOutlined /> }}
        >
          Edit
        </ModalComponent>
        <Button ghost danger icon={<DeleteOutlined />} />
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

import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Flex, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";
import ModalComponent from "../../common/ModalComponent";
import type { Quest } from "./Quest";

function QuestExtra({ quest }: { quest: Quest }) {
  const { t } = useTranslation();

  console.log(quest);
  return (
    <Flex gap={8}>
      <Popconfirm
        title={t("quest.confirm.done", {
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
        title={t("quest.confirm.delete", {
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
  );
}

export default QuestExtra;

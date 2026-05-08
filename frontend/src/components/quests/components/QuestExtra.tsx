import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Flex, Typography } from "antd";
import { useTranslation } from "react-i18next";
import ModalComponent from "../../common/ModalComponent";
import type { Quest } from "./Quest";
import PopconfirmComponent from "../../common/PopconfirmComponent";
import QuestForm from "./QuestForm";

function QuestExtra({ quest }: { quest: Quest }) {
  const { t } = useTranslation();

  if (quest.completed)
    return (
      <Typography.Text italic>
        {t("quest.status.completed", { defaultValue: "Completed" })}
      </Typography.Text>
    );

  return (
    <Flex gap={8}>
      <PopconfirmComponent
        cancelButtonProps={{ type: "primary", danger: true }}
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
      </PopconfirmComponent>
      <ModalComponent
        buttonInner=""
        buttonProps={{ type: "primary", icon: <EditOutlined /> }}
      >
        <QuestForm initialValue={quest} />
      </ModalComponent>
      <PopconfirmComponent
        title={t("quest.confirm.delete", {
          defaultValue: "Are you sure you want to delete this Quest?",
        })}
      >
        <Button
          ghost
          danger
          icon={<DeleteOutlined />}
          onClick={(e) => e.stopPropagation()}
        />
      </PopconfirmComponent>
    </Flex>
  );
}

export default QuestExtra;

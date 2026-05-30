import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Typography } from "antd";
import { useTranslation } from "react-i18next";
import ModalComponent from "../../common/ModalComponent";
import PopconfirmComponent from "../../common/PopconfirmComponent";
import QuestForm from "./QuestForm";
import type { MainCustomQuest, MainRepeatingQuest } from "../../../api";
import { useState } from "react";
import { useEditQuest } from "../hooks/useEditQuest";
import { useCompleteQuest } from "../hooks/useCompleteQuest";

function QuestExtra({
  quest,
}: {
  quest: MainRepeatingQuest | MainCustomQuest;
}) {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const { mutate: editQuest } = useEditQuest();

  const { mutate: completeQuest } = useCompleteQuest();

  const [form] = Form.useForm();

  const handleFinish = () => {
    if (quest.id) {
      completeQuest(quest.id);
    }
  };

  const handleEdit = () => {
    form.validateFields().then((values) => {
      editQuest(
        { body: { id: quest.id, ...values } },
        { onSuccess: () => setOpen(false) },
      );
    });
  };

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
        onConfirm={handleFinish}
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
        title={t("quest.repeating.editModalTitle", {
          defaultValue: "Edit quest",
        })}
        onOk={handleEdit}
        isOpen={open}
        setIsOpen={setOpen}
      >
        <QuestForm formInstance={form} initialValue={quest} />
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

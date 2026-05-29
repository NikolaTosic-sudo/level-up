import { PlusOutlined } from "@ant-design/icons";
import ModalComponent from "../../common/ModalComponent";
import { Collapse, Form } from "antd";
import { useTranslation } from "react-i18next";
import type { MainCustomQuest } from "../../../api";
import Quest from "./Quest";
import QuestForm from "./QuestForm";
import { useState } from "react";
import { useEditQuest } from "../hooks/useEditQuest";

type CustomQuestsProps = {
  quests?: Array<MainCustomQuest>;
};

function CustomQuests({ quests }: CustomQuestsProps) {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();

  const { mutate } = useEditQuest();

  const handleFinish = () => {
    form.validateFields().then((values) => {
      mutate(
        { body: { type: "custom", ...values } },
        { onSuccess: () => setOpen(false) },
      );
    });
  };

  return (
    <Collapse
      style={{ marginTop: 24 }}
      items={[
        {
          key: "1",
          label: t("quest.custom", { defaultValue: "Custom quests" }),
          children: <Quest quests={quests} />,
          extra: (
            <ModalComponent
              buttonInner={t("quest.add.custom", {
                defaultValue: "Add a custom quest",
              })}
              buttonProps={{
                type: "primary",
                icon: <PlusOutlined />,
              }}
              title={t("quest.custom.modalTitle", {
                defaultValue: "Add a custom quest",
              })}
              destroyOnHidden
              onOk={handleFinish}
              isOpen={open}
              setIsOpen={setOpen}
            >
              <QuestForm formInstance={form} custom />
            </ModalComponent>
          ),
        },
      ]}
    />
  );
}

export default CustomQuests;

import { PlusOutlined } from "@ant-design/icons";
import ModalComponent from "../../common/ModalComponent";
import { Collapse, Form } from "antd";
import { useTranslation } from "react-i18next";
import type { MainTypeRepeatingQuest } from "../../../api";
import Quest from "./Quest";
import QuestForm from "./QuestForm";
import { useEditQuest } from "../hooks/useEditQuest";
import { useState } from "react";

type RepeatingQuestsProps = {
  quests?: Array<MainTypeRepeatingQuest>;
};

function RepeatingQuests({ quests }: RepeatingQuestsProps) {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();

  const { mutate } = useEditQuest();

  const handleFinish = () => {
    form.validateFields().then((values) => {
      mutate({ body: { ...values } }, { onSuccess: () => setOpen(false) });
    });
  };

  return (
    <Collapse
      items={[
        {
          key: "1",
          label: t("quest.repeating", { defaultValue: "Repeating quests" }),
          children: quests?.map((q) => (
            <Quest quests={q.quests} title={q.type} />
          )),
          extra: (
            <ModalComponent
              buttonInner={t("quest.add.repeating", {
                defaultValue: "Add a repeating quest",
              })}
              buttonProps={{
                type: "primary",
                icon: <PlusOutlined />,
              }}
              title={t("quest.repeating.modalTitle", {
                defaultValue: "Add a repeating quest",
              })}
              onOk={handleFinish}
              isOpen={open}
              setIsOpen={setOpen}
            >
              <QuestForm formInstance={form} />
            </ModalComponent>
          ),
        },
      ]}
    />
  );
}

export default RepeatingQuests;

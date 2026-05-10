import { Collapse } from "antd";
import ModalComponent from "../../common/ModalComponent";
import { useTranslation } from "react-i18next";
import { PlusOutlined } from "@ant-design/icons";
import Quest from "./Quest";
import quests from "./quest.json";
import customQuests from "./customQuests.json";
import QuestForm from "./QuestForm";

function QuestsWrapper() {
  const { t } = useTranslation();
  return (
    <>
      <Collapse
        items={[
          {
            key: "1",
            label: t("quest.repeating", { defaultValue: "Repeating quests" }),
            children: quests.map((q) => (
              <Quest quests={q.quests} title={q.title} />
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
              >
                <QuestForm />
              </ModalComponent>
            ),
          },
        ]}
      />
      <Collapse
        style={{ marginTop: 24 }}
        items={[
          {
            key: "1",
            label: t("quest.custom", { defaultValue: "Custom quests" }),
            children: <Quest quests={customQuests} />,
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
              >
                <QuestForm custom />
              </ModalComponent>
            ),
          },
        ]}
      />
    </>
  );
}

export default QuestsWrapper;

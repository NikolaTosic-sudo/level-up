import { Collapse } from "antd";
import ModalComponent from "../../common/ModalComponent";
import { useTranslation } from "react-i18next";
import { PlusOutlined } from "@ant-design/icons";
import Quest from "./Quest";
import quests from "./quest.json";

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
              ></ModalComponent>
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
            children: <div>No</div>,
            extra: (
              <ModalComponent
                buttonInner={t("quest.add.custom", {
                  defaultValue: "Add a custom quest",
                })}
                buttonProps={{
                  type: "primary",
                  icon: <PlusOutlined />,
                }}
              ></ModalComponent>
            ),
          },
        ]}
      />
    </>
  );
}

export default QuestsWrapper;

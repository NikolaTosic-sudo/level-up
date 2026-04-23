import { Flex } from "antd";
import skills from "./skills.json";
import SkillModal from "./SkillModal";
import ModalComponent from "../../common/ModalComponent";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

function SkillsWrapper() {
  const { t } = useTranslation();

  return (
    <>
      <ModalComponent
        buttonProps={{
          type: "primary",
          icon: <PlusOutlined />,
        }}
        buttonInner={t("", { defaultValue: "Add skill" })}
      >
        dodaj
      </ModalComponent>
      <Flex gap={16} wrap style={{ marginTop: 16 }}>
        {skills.map((s) => (
          <SkillModal key={s.id} skill={s} />
        ))}
      </Flex>
    </>
  );
}

export default SkillsWrapper;

import { useState } from "react";
import SkillForm from "./SkillForm";
import ModalComponent from "../../common/ModalComponent";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import SelectSkills from "../../profileCreation/components/SelectSkills";

function NewSkillWrapper() {
  const { t } = useTranslation();
  const [name, setName] = useState("");

  return (
    <ModalComponent
      buttonProps={{
        type: "primary",
        icon: <PlusOutlined />,
      }}
      buttonInner={t("", { defaultValue: "Add skill" })}
      okText={t("", { defaultValue: "Save" })}
      destroyOnHidden
      onCancel={() => setName("")}
      footer={(children) => (name ? children : false)}
      className={name ? "" : "new-skill"}
    >
      {name ? (
        <SkillForm
          skill={{
            name,
            experience: 0,
            experienceNeeded: 100,
            level: 1,
            id: "0000",
          }}
        />
      ) : (
        <SelectSkills onChange={setName} />
      )}
    </ModalComponent>
  );
}

export default NewSkillWrapper;

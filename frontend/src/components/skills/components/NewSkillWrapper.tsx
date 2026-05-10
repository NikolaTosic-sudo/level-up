import { useState } from "react";
import SkillForm from "./SkillForm";
import ModalComponent from "../../common/ModalComponent";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import SelectSkills from "../../profileCreation/components/SelectSkills";

function NewSkillWrapper() {
  const { t } = useTranslation();
  const [skill, setSkill] = useState<{ id?: number; name?: string } | null>(
    null,
  );

  return (
    <ModalComponent
      buttonProps={{
        type: "primary",
        icon: <PlusOutlined />,
      }}
      buttonInner={t("skill.modal.add", { defaultValue: "Add skill" })}
      okText={t("skill.modal.save", { defaultValue: "Save" })}
      destroyOnHidden
      onCancel={() => setSkill(null)}
      footer={(children) => (skill ? children : false)}
      className={skill ? "" : "new-skill"}
    >
      {skill ? (
        <SkillForm
          skill={{
            name: skill.name ?? "",
            experience: 0,
            experienceNeeded: 100,
            level: 1,
            id: "0000",
          }}
        />
      ) : (
        <SelectSkills onChange={setSkill} />
      )}
    </ModalComponent>
  );
}

export default NewSkillWrapper;

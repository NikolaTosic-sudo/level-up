import { useState } from "react";
import SkillForm from "./SkillForm";
import ModalComponent from "../../common/ModalComponent";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import SelectSkills from "../../profileCreation/components/SelectSkills";
import { Form } from "antd";
import { useEditSkill } from "../hooks/useEditSkill";

function NewSkillWrapper() {
  const { t } = useTranslation();
  const { mutate } = useEditSkill();
  const [skill, setSkill] = useState<{ id?: number; name?: string } | null>(
    null,
  );

  const [form] = Form.useForm();

  return (
    <ModalComponent
      buttonProps={{
        type: "primary",
        icon: <PlusOutlined />,
      }}
      buttonInner={t("skill.modal.add", { defaultValue: "Add skill" })}
      okText={t("skill.modal.save", { defaultValue: "Save" })}
      destroyOnHidden
      onOk={() => {
        if (skill && skill.name) {
          const values = form.getFieldsValue();
          mutate({
            body: {
              name: skill?.name,
              id: skill?.id,
              linkedSkills: values?.skills ?? [],
            },
          });
        }
      }}
      onCancel={() => setSkill(null)}
      footer={(children) => (skill ? children : false)}
      className={skill ? "" : "new-skill"}
    >
      {skill ? (
        <SkillForm
          formInstance={form}
          skill={{
            name: skill.name ?? "",
            experience: 0,
            experienceNeeded: 100,
            level: 1,
          }}
        />
      ) : (
        <SelectSkills mode="excludeAllUsersSkills" onChange={setSkill} />
      )}
    </ModalComponent>
  );
}

export default NewSkillWrapper;

import { useTranslation } from "react-i18next";
import ModalComponent from "../../common/ModalComponent";
import SkillForm from "./SkillForm";
import { EditOutlined } from "@ant-design/icons";
import type { MainSkill } from "../../../api";
import { Form } from "antd";
import { useEditSkill } from "../hooks/useEditSkill";

type SkillModalProps = {
  skill: MainSkill;
  onExit?: () => void;
};

function SkillModal({ skill, onExit }: SkillModalProps) {
  const { t } = useTranslation();
  const { mutate } = useEditSkill();

  const [form] = Form.useForm();

  return (
    <ModalComponent
      buttonInner={""}
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
          if (onExit) onExit();
        }
      }}
      okText={t("skill.modal.save", { defaultValue: "Save" })}
      buttonProps={{
        type: "primary",
        ghost: true,
        style: { fontSize: 10, height: 20, width: 20 },
        icon: <EditOutlined />,
      }}
      buttonTooltip={t("skill.modal.edit", { defaultValue: "Edit skill" })}
      destroyOnHidden
      onCancel={onExit}
    >
      <SkillForm formInstance={form} skill={skill} />
    </ModalComponent>
  );
}

export default SkillModal;

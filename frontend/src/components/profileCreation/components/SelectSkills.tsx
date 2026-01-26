import React, { useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Form,
  Input,
  Select,
  Space,
  type RefSelectProps,
} from "antd";
import { useTranslation } from "react-i18next";

const SelectSkills = () => {
  const { t } = useTranslation();
  const [skill, setSkill] = useState("");
  const [open, setOpen] = useState(false);

  const selectRef = useRef<RefSelectProps>(null);

  const formInstance = Form.useFormInstance();

  const userSkills = Form.useWatch("skills", formInstance);

  const items = ["development development", "driving"]; // We'll get items from the backend, with all skills users added

  const onSkillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSkill(event.target.value);
  };

  function handleChange(selectedString: string) {
    if (userSkills && userSkills.length) {
      formInstance.setFieldValue("skills", [...userSkills, selectedString]);
    } else {
      formInstance.setFieldValue("skills", [selectedString]);
    }
    setOpen(false);
    selectRef.current?.blur();
  }

  const addItem = () => {
    if (skill) {
      setSkill("");
      handleChange(skill);
    }
  };

  return (
    <Select
      style={{ width: 300 }}
      placeholder={t("profileCreationTrans.selectSkill.placeholderSelect", {
        defaultValue: "Select skill",
      })}
      ref={selectRef}
      onChange={handleChange}
      open={open}
      onFocus={() => setOpen(true)}
      onOpenChange={setOpen}
      showSearch
      value={null}
      popupRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: "8px 0" }} />
          <Space style={{ padding: "0 8px 4px" }}>
            <Input
              placeholder={t(
                "profileCreationTrans.selectSkill.placeholderAdd",
                { defaultValue: "Please enter skill" },
              )}
              value={skill}
              onChange={onSkillChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type="primary" icon={<PlusOutlined />} onClick={addItem}>
              {t("profileCreationTrans.selectSkill.addSkill", {
                defaultValue: "Add skill",
              })}
            </Button>
          </Space>
        </>
      )}
      options={items
        .filter((o) => !(userSkills ?? []).includes(o))
        .map((item) => ({ label: item, value: item }))}
    />
  );
};

export default SelectSkills;

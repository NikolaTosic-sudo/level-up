import React, { useRef, useState } from "react";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Divider,
  Flex,
  Form,
  Input,
  Select,
  Space,
  Spin,
  type RefSelectProps,
} from "antd";
import { useTranslation } from "react-i18next";
import { useGetSkills } from "../hooks/useGetSkills";
import { useDebounce } from "../../../hooks/useDebounce";

type SelectSkillsProps = {
  onChange?: (skill: string) => void;
  forUser?: boolean;
  marginLeft?: number;
};

const SelectSkills = ({
  onChange,
  forUser,
  marginLeft = 24,
}: SelectSkillsProps) => {
  const { t } = useTranslation();
  const [skill, setSkill] = useState("");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [open, setOpen] = useState(false);

  const { data: items, isLoading } = useGetSkills(debouncedSearch, forUser);

  const selectRef = useRef<RefSelectProps>(null);

  const formInstance = Form.useFormInstance();

  const userSkills = Form.useWatch("skills", formInstance);

  const onSkillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSkill(event.target.value);
  };

  function handleChange(selectedString: string) {
    if (selectedString) {
      if (userSkills && userSkills.length) {
        formInstance.setFieldValue("skills", [...userSkills, selectedString]);
      } else {
        formInstance.setFieldValue("skills", [selectedString]);
      }
      setOpen(false);
      selectRef.current?.blur();
    }
  }

  const addItem = () => {
    if (skill) {
      setSkill("");

      if (onChange) {
        onChange(skill);
      } else {
        handleChange(skill);
      }
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorSplit: "rgba(0, 255, 255, 0.55)",
        },
      }}
    >
      <Select
        style={{ marginLeft, width: 300, maxHeight: 40 }}
        placeholder={t("profileCreationTrans.selectSkill.placeholderSelect", {
          defaultValue: "Select skill",
        })}
        ref={selectRef}
        onChange={onChange ?? handleChange}
        open={open}
        onFocus={() => setOpen(true)}
        onOpenChange={setOpen}
        loading={isLoading}
        showSearch={{
          onSearch: setSearch,
        }}
        suffix={() => <SearchOutlined />}
        value={null}
        popupRender={(menu) => (
          <>
            {isLoading ? (
              <Flex align="center" justify="center" style={{ height: 120 }}>
                <Spin />
              </Flex>
            ) : (
              menu
            )}
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
        options={items?.skills
          ?.filter((o) => !(userSkills ?? []).includes(o))
          .map((item) => ({ label: item, value: item }))}
      />
    </ConfigProvider>
  );
};

export default SelectSkills;

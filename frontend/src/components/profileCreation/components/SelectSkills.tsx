import React, { useRef, useState } from "react";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Divider,
  Flex,
  Form,
  Input,
  message,
  Select,
  Space,
  Spin,
  type RefSelectProps,
} from "antd";
import { useTranslation } from "react-i18next";
import { useGetSkills } from "../hooks/useGetSkills";
import { useDebounce } from "../../../hooks/useDebounce";

type Skill =
  | { label?: string; value?: number }
  | { label?: string; value?: number }[];

export type Mode = "excludeSelectedUsersSkills" | "excludeAllUsersSkills";

type SelectSkillsProps = {
  onChange?: (skill: { id?: number; name?: string }) => void;
  mode?: Mode;
  marginLeft?: number;
  excludeSkill?: string;
};

const SelectSkills = ({
  onChange,
  mode,
  marginLeft = 24,
  excludeSkill,
}: SelectSkillsProps) => {
  const { t } = useTranslation();
  const [skill, setSkill] = useState("");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const formInstance = Form.useFormInstance();

  const debouncedSearch = useDebounce(search, 500);

  const userSkills = Form.useWatch("skills", formInstance);

  const userIds = userSkills?.map((s: { id: number }) => s.id) ?? [];

  const loweredTrimedExcluded = excludeSkill?.trim().toLowerCase();

  const { data: items, isLoading } = useGetSkills(
    debouncedSearch,
    mode,
    userIds,
  );

  const selectRef = useRef<RefSelectProps>(null);

  const onSkillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSkill(event.target.value);
  };

  function handleChange(_selectedString: string, option?: Skill) {
    if (option && !Array.isArray(option)) {
      const skill = {
        id: option.value,
        name: option.label,
      };
      if (onChange) {
        onChange(skill);
      }

      if (userSkills && userSkills.length) {
        formInstance.setFieldValue("skills", [...userSkills, skill]);
      } else {
        formInstance.setFieldValue("skills", [skill]);
      }
      setOpen(false);
      selectRef.current?.blur();
    }
  }

  const addItem = () => {
    if (skill) {
      const loweredTrimedSkill = skill.trim().toLowerCase();

      if (
        loweredTrimedSkill == loweredTrimedExcluded ||
        userSkills?.some(
          (s: { name: string }) =>
            s?.name?.trim().toLowerCase() === loweredTrimedSkill,
        ) ||
        items?.skills?.some(
          (s: { name?: string }) =>
            s?.name?.trim().toLowerCase() === loweredTrimedSkill,
        )
      ) {
        message.error(t("", { defaultValue: "Skill already exists." }));
        return;
      }
      setSkill("");

      if (onChange) {
        onChange({ id: 0, name: skill });
      } else {
        handleChange("", { value: 0, label: skill });
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
        onChange={handleChange}
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
          ?.filter(
            (o) =>
              !userIds.includes(o.id) &&
              o.name?.trim().toLowerCase() !== loweredTrimedExcluded,
          )
          .map((item) => ({ label: item.name, value: item.id }))}
      />
    </ConfigProvider>
  );
};

export default SelectSkills;

import { Select, type SelectProps } from "antd";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

type SelectRepeatProps = {
  value?: string;
  onChange?: (r: string) => void;
};

const options: SelectProps["options"] = [
  {
    label: t("type.d", { defaultValue: "Daily" }),
    value: "d",
  },
  {
    label: t("type.w", { defaultValue: "Weekly" }),
    value: "w",
  },
  {
    label: t("type.m", { defaultValue: "Monthly" }),
    value: "m",
  },
  {
    label: t("type.y", { defaultValue: "Yearly" }),
    value: "y",
  },
];

function SelectRepeat({ value, onChange }: SelectRepeatProps) {
  const { t } = useTranslation();

  return (
    <Select
      placeholder={t("quest.form.placeholder.questRepeats", {
        defaultValue: "Select how quest repeats",
      })}
      value={value}
      onChange={onChange}
      options={options}
    />
  );
}

export default SelectRepeat;

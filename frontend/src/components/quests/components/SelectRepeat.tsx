import { Select, type SelectProps } from "antd";
import { t } from "i18next";

type SelectRepeatProps = {
  value?: string;
  onChange?: (r: string) => void;
};

const options: SelectProps["options"] = [
  {
    label: t("", { defaultValue: "Daily" }),
    value: "d",
  },
  {
    label: t("", { defaultValue: "Weekly" }),
    value: "w",
  },
  {
    label: t("", { defaultValue: "Monthly" }),
    value: "m",
  },
  {
    label: t("", { defaultValue: "Yearly" }),
    value: "y",
  },
];

function SelectRepeat({ value, onChange }: SelectRepeatProps) {
  return <Select value={value} onChange={onChange} options={options} />;
}

export default SelectRepeat;

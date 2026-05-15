import { Card } from "antd";
import { useTranslation } from "react-i18next";
import EditableText from "./EditableText";

function BioCard() {
  const { t } = useTranslation();

  return (
    <Card title={t("", { defaultValue: "Bio" })}>
      <EditableText
        val={
          "ovo je neki tekst ovo je neki tekst ovo je neki tekst ovo je neki tekst ovo je neki tekst ovo je neki tekst ovo je neki tekst ovo je neki tekst ovo je neki tekst ovo je neki tekst ovo je neki tekst ovo je neki tekst ovo je neki tekst ovo je neki tekst ovo je neki tekst ovo je neki tekst ovo je neki tekst ovo je neki tekst ovo je neki tekst ovo je neki tekst ovo je neki tekst ovo je neki tekst ovo je neki tekst ovo je neki tekst ovo je neki tekst ovo je neki tekst"
        }
        editable
        onChange={(value) => console.log(value)}
        style={{ display: "flex", marginLeft: 0, alignItems: "start" }}
        mode="textArea"
      />
    </Card>
  );
}

export default BioCard;

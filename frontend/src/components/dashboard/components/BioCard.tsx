import { Card } from "antd";
import { useTranslation } from "react-i18next";
import EditableText from "./EditableText";
import { useUpdateUser } from "../hooks/useUpdateUser";

type BioCardProps = {
  bio: string;
};

function BioCard({ bio }: BioCardProps) {
  const { t } = useTranslation();

  const { mutate } = useUpdateUser();

  return (
    <Card title={t("", { defaultValue: "Bio" })}>
      <EditableText
        val={bio}
        editable
        onChange={(value) =>
          mutate({ body: { bio: value.trim(), target: "bio" } })
        }
        style={{ display: "flex", marginLeft: 0, alignItems: "start" }}
        spaceStyle={{ width: "100%" }}
        mode="textArea"
        placeholder={t("", { defaultValue: "Something about yourself" })}
      />
    </Card>
  );
}

export default BioCard;

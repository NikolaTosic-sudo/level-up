import { Card } from "antd";
import { useTranslation } from "react-i18next";
import EditableText from "./EditableText";
import type { MainProfileResponse } from "../../../api";
import dayjs from "dayjs";
import { useUpdateUser } from "../hooks/useUpdateUser";

type ProfileCardProps = {
  user: MainProfileResponse;
};

function ProfileCard({ user }: ProfileCardProps) {
  const { t } = useTranslation();

  const { mutate } = useUpdateUser();

  return (
    <Card title={t("", { defaultValue: "Profile" })}>
      <EditableText
        title={t("", { defaultValue: "First name:" })}
        val={user.firstName}
        onChange={(value) =>
          mutate({ body: { firstName: value, target: "firstName" } })
        }
        editable
      />

      <EditableText
        title={t("", { defaultValue: "Last name:" })}
        val={user.lastName}
        onChange={(value) =>
          mutate({ body: { lastName: value, target: "lastName" } })
        }
        editable
      />

      <EditableText
        title={t("", { defaultValue: "Email:" })}
        val={user.email}
        onChange={(value) =>
          mutate({ body: { email: value, target: "email" } })
        }
        editable
      />

      <EditableText
        title={t("", { defaultValue: "Nickname:" })}
        val={user.nickName}
        onChange={(value) =>
          mutate({ body: { nickName: value, target: "nickname" } })
        }
        editable
      />

      <EditableText
        title={t("", { defaultValue: "Date of Birth:" })}
        val={dayjs(user.dateOfBirth).format("DD.MM.YYYY")}
        onChange={(value) =>
          mutate({ body: { dateOfBirth: value, target: "date" } })
        }
        editable
        mode="date"
      />
    </Card>
  );
}

export default ProfileCard;

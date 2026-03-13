import {
  Card,
  Descriptions,
  Divider,
  Empty,
  Flex,
  Form,
  Typography,
} from "antd";
import type { DescriptionsItemType } from "antd/es/descriptions";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

export const ProfileCreationFinish = () => {
  const { t } = useTranslation();
  const formInstance = Form.useFormInstance();

  const values = formInstance.getFieldsValue(true);

  const valuesExist = Object.values(values).some((val: unknown) =>
    Array.isArray(val) ? val.length : val,
  );

  if (!valuesExist) {
    return (
      <Empty
        description={t("profileCreationTrans.formFinish.empty", {
          defaultValue: "Please enter data in profile creation",
        })}
      />
    );
  }

  const descItems: DescriptionsItemType[] = [
    {
      label: t("profileCreationTrans.formFinish.profileDetails.firstName", {
        defaultValue: "First name",
      }),
      children: values.firstName,
    },
    {
      label: t("profileCreationTrans.formFinish.profileDetails.lastName", {
        defaultValue: "Last name",
      }),
      children: values.lastName,
    },
    {
      label: t("profileCreationTrans.formFinish.profileDetails.nickname", {
        defaultValue: "Nickname",
      }),
      children: values.nickname,
    },
    {
      label: t("profileCreationTrans.formFinish.profileDetails.dateBirth", {
        defaultValue: "Date of birth",
      }),
      children:
        values.dateOfBirth && dayjs.isDayjs(values.dateOfBirth)
          ? values.dateOfBirth.format("DD/MM/YYYY")
          : null,
      style:
        values.dateOfBirth && dayjs.isDayjs(values.dateOfBirth)
          ? {}
          : { display: "none" },
    },
  ];

  return (
    <div className="profile-creation-main">
      <Divider titlePlacement="start" style={{ marginTop: 0 }}>
        <Typography.Title level={3} style={{ marginBlock: 12 }}>
          {t("profileCreationTrans.formFinish.profileTitle", {
            defaultValue: "Profile data",
          })}
        </Typography.Title>
      </Divider>

      <Descriptions items={descItems} />
      {values.skills && values.skills.length ? (
        <>
          <Divider titlePlacement="start">
            <Typography.Title level={3} style={{ marginBlock: 12 }}>
              {t("profileCreationTrans.formFinish.skillsTitle", {
                defaultValue: "Skills",
              })}
            </Typography.Title>
          </Divider>
        </>
      ) : null}
      {values.quests && values.quests.length ? (
        <>
          <Divider titlePlacement="start">
            <Typography.Title level={3} style={{ marginBlock: 12 }}>
              {t("profileCreationTrans.formFinish.questsTitle", {
                defaultValue: "Quests",
              })}
            </Typography.Title>
          </Divider>
          <Flex gap={18} vertical>
            {values.quests.map((q: string) => (
              <Card className="quest-card" styles={{ body: { padding: 12 } }}>
                {q}
              </Card>
            ))}
          </Flex>
        </>
      ) : null}
    </div>
  );
};

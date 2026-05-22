import {
  Card,
  Descriptions,
  Divider,
  Empty,
  Flex,
  Form,
  Tag,
  Typography,
} from "antd";
import type { DescriptionsItemType } from "antd/es/descriptions";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import type { Skill } from "../../skills/components/SkillModal";

type FormQuest = {
  name?: string;
  experience: number;
};

export const ProfileCreationFinish = () => {
  const { t } = useTranslation();
  const formInstance = Form.useFormInstance();

  const values = formInstance.getFieldsValue(true);

  const quests = values.quests
    ? values.quests.filter((q: FormQuest) => q && q.name)
    : [];

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
          <Flex gap={16} wrap>
            {values.skills.map((s: Skill, index: number) => (
              <Tag key={`${s.id}_${index}`} className="skills-finish">
                <Typography.Paragraph
                  ellipsis={{ tooltip: true }}
                  style={{ maxWidth: 140 }}
                >
                  {s.name}
                </Typography.Paragraph>
              </Tag>
            ))}
          </Flex>
        </>
      ) : null}
      {quests.length ? (
        <>
          <Divider titlePlacement="start">
            <Typography.Title level={3} style={{ marginBlock: 12 }}>
              {t("profileCreationTrans.formFinish.questsTitle", {
                defaultValue: "Quests",
              })}
            </Typography.Title>
          </Divider>
          <Flex gap={18} vertical>
            {quests.map((q: FormQuest, idx: number) => (
              <Card
                key={`${q}_${idx}`}
                className="quest-card"
                styles={{
                  body: { display: "none" },
                  title: { maxWidth: "80%" },
                }}
                title={q.name}
                extra={t("", {
                  defaultValue: "Experience: {{exp}}",
                  exp: q.experience,
                })}
              />
            ))}
          </Flex>
        </>
      ) : null}
    </div>
  );
};

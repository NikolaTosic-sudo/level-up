import { Descriptions, Empty, Form } from "antd";
import type { DescriptionsItemType } from "antd/es/descriptions";
import { useTranslation } from "react-i18next";

export const ProfileCreationFinish = () => {
  const { t } = useTranslation();
  const formInstance = Form.useFormInstance();

  const values = formInstance.getFieldsValue(true);

  const valuesExist = Object.values(values).some((val: unknown) =>
    Array.isArray(val) ? val.length : val,
  );

  console.log(values, valuesExist);

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
        defaultValue: "",
      }),
      children: values.firstName,
    },
    {
      label: t("profileCreationTrans.formFinish.profileDetails.firstName", {
        defaultValue: "",
      }),
      children: values.lastName,
    },
    {
      label: t("profileCreationTrans.formFinish.profileDetails.firstName", {
        defaultValue: "",
      }),
      children: values.nickname,
    },
    {
      label: t("profileCreationTrans.formFinish.profileDetails.firstName", {
        defaultValue: "",
      }),
      children: values.firstName,
    },
  ];

  return (
    <>
      <Descriptions items={descItems} />
    </>
  );
};

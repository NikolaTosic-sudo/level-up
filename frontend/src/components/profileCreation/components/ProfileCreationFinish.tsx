import { Empty, Form } from "antd";
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

  return <div></div>;
};

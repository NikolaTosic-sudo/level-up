import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";

function SignInComponent() {
  const { t } = useTranslation();
  return (
    <>
      <Form.Item
        name="email"
        label={t("", { defaultValue: "Email" })}
        rules={[{ required: true }]}
      >
        <Input
          type={"email"}
          placeholder={t("", { defaultValue: "Enter your email here" })}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true }]}
        label={t("", { defaultValue: "Password" })}
      >
        <Input.Password
          placeholder={t("", { defaultValue: "Enter your password here" })}
        />
      </Form.Item>
    </>
  );
}

export default SignInComponent;

import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";

function SignInComponent() {
  const { t } = useTranslation();
  return (
    <>
      <Form.Item
        name="email"
        label={t("", { defaultValue: "Email" })}
        rules={[
          { required: true, message: t("Please enter your email!") },
          {
            type: "email",
            message: t("", {
              defaultValue: "Please enter a valid email address!",
            }),
          },
        ]}
      >
        <Input
          type={"email"}
          placeholder={t("", { defaultValue: "Enter your email here" })}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: t("Please enter your password!") }]}
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

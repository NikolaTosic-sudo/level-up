import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";

function SignUpComponent() {
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
        label={t("", { defaultValue: "Password" })}
        rules={[{ required: true, message: t("Please enter your password!") }]}
      >
        <Input.Password
          placeholder={t("", { defaultValue: "Enter your password here" })}
        />
      </Form.Item>

      <Form.Item
        name="confirm"
        label={t("", { defaultValue: "Confirm password" })}
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: t("", {
              defaultValue: "Please enter your password again!",
            }),
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error(
                  t("", {
                    defaultValue:
                      "The new password that you entered do not match!",
                  }),
                ),
              );
            },
          }),
        ]}
      >
        <Input.Password
          placeholder={t("", { defaultValue: "Enter your password here" })}
        />
      </Form.Item>
    </>
  );
}

export default SignUpComponent;

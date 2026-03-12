import { ConfigProvider, DatePicker, Form, Input } from "antd";
import { useTranslation } from "react-i18next";

function ProfileCreationForm() {
  const { t } = useTranslation();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorText: "black",
          colorTextDisabled: "rgba(0, 0, 0, 0.45)",
        },
        components: {
          Form: {
            labelColor: "white",
          },
        },
      }}
    >
      <div className="profile-creation-main">
        <Form.Item
          name="firstName"
          label={t("profileCreationTrans.formProfile.firstName", {
            defaultValue: "First name",
          })}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="lastName"
          label={t("profileCreationTrans.formProfile.lastName", {
            defaultValue: "Last name",
          })}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="nickname"
          label={t("profileCreationTrans.formProfile.nickname", {
            defaultValue: "Nickname",
          })}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="dateOfBirth"
          label={t("profileCreationTrans.formProfile.dateOfBirth", {
            defaultValue: "Date of birth",
          })}
        >
          <DatePicker />
        </Form.Item>
      </div>
    </ConfigProvider>
  );
}

export default ProfileCreationForm;

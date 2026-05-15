import { ConfigProvider, DatePicker, Form, Input } from "antd";
import { useTranslation } from "react-i18next";

function ProfileCreationForm() {
  const { t } = useTranslation();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorError: "#DD0A3C",
          colorSplit: "rgba(0, 0, 0, 0.05)",
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
          name="bio"
          label={t("profileCreationTrans.formProfile.bio", {
            defaultValue: "Bio",
          })}
        >
          <Input.TextArea
            rows={4}
            placeholder={t("profileCreationTrans.formProfile.placeholder.bio", {
              defaultValue: "Please tell us a little something about yourself",
            })}
          />
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

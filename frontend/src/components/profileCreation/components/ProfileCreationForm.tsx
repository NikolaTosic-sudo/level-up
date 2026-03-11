import { DatePicker, Form, Input } from "antd";
import { useTranslation } from "react-i18next";

function ProfileCreationForm() {
  const { t } = useTranslation();

  return (
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
  );
}

export default ProfileCreationForm;

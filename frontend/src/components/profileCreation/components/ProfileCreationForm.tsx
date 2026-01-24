import { Button, DatePicker, Form, Input, Upload } from "antd";
import { useTranslation } from "react-i18next";

function ProfileCreationForm() {
  const { t } = useTranslation();

  return (
    <>
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
        rules={[{ required: true }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="profilePicture"
        label={t("profileCreationTrans.formProfile.uploadPicture", {
          defaultValue: "Upload profile picture",
        })}
        rules={[{ required: true }]}
        valuePropName="file"
      >
        <Upload
          accept={".png, .jpeg, .webp, .jpg"}
          maxCount={1}
          beforeUpload={() => false}
        >
          <Button>Upload</Button>
        </Upload>
      </Form.Item>
    </>
  );
}

export default ProfileCreationForm;

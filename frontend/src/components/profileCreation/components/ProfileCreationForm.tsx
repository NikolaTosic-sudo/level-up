import { Button, DatePicker, Form, Input, Upload } from "antd";
import { useTranslation } from "react-i18next";

function ProfileCreationForm() {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <Form form={form} requiredMark={false} colon={false} layout="vertical">
      <Form.Item
        name="firstName"
        label={t("profileCreationTrans.form.firstName", {
          defaultValue: "First name",
        })}
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="lastName"
        label={t("profileCreationTrans.form.lastName", {
          defaultValue: "Last name",
        })}
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="nickname"
        label={t("profileCreationTrans.form.nickname", {
          defaultValue: "Nickname",
        })}
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="dateOfBirth"
        label={t("profileCreationTrans.form.dateOfBirth", {
          defaultValue: "Date of birth",
        })}
        rules={[{ required: true }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="profilePicture"
        label={t("profileCreationTrans.form.uploadPicture", {
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
    </Form>
  );
}

export default ProfileCreationForm;

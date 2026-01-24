import { Form } from "antd";

export const ProfileCreationFinish = () => {
  const formInstance = Form.useFormInstance();

  const values = formInstance.getFieldsValue();

  console.log(values);

  return <div></div>;
};

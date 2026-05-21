import { useState } from "react";
import { useTranslation } from "react-i18next";
import ModalComponent from "../../common/ModalComponent";
import SignInComponent from "./SignInComponent";
import SignUpComponent from "./SignUpComponents";
import { Button, Form, message, Space } from "antd";
import { useSignUp } from "../hooks/useSignUp";
import ErrorMessageComponent from "../../common/ErrorMessageComponent";

function SignInWrapper() {
  const { t } = useTranslation();
  const [signIn, setSignIn] = useState<boolean>(true);

  const { mutate } = useSignUp(signIn);

  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        mutate({ body: values });
      })
      .catch((e) =>
        message.error(
          <ErrorMessageComponent error={e?.message ?? ""} notApiError />,
        ),
      );
  };

  const handleChangeSignIn = () => {
    setSignIn((prevState) => !prevState);
    form.resetFields();
  };

  return (
    <>
      <ModalComponent
        buttonInner={t("", { defaultValue: "Sign up" })}
        title={
          signIn
            ? t("", { defaultValue: "Sign In" })
            : t("", { defaultValue: "Sign Up" })
        }
        closable
        onOk={handleOk}
        width={500}
        style={{ height: "fit-content" }}
        destroyOnHidden
        footer={(_children, btns) => (
          <Space>
            <Button color="gold" variant="solid" onClick={handleChangeSignIn}>
              {signIn
                ? t("", { defaultValue: "Sign Up" })
                : t("", { defaultValue: "Sign In" })}
            </Button>
            <btns.CancelBtn />
            <btns.OkBtn />
          </Space>
        )}
      >
        <Form form={form} clearOnDestroy colon={false} layout="vertical">
          {signIn ? <SignInComponent /> : <SignUpComponent />}
        </Form>
      </ModalComponent>
    </>
  );
}

export default SignInWrapper;

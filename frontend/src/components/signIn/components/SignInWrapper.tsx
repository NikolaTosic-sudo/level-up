import { useState } from "react";
import { useTranslation } from "react-i18next";
import ModalComponent from "../../common/ModalComponent";
import SignInComponent from "./SignInComponent";
import SignUpComponent from "./SignUpComponents";
import { Button, Form, Space } from "antd";
import { useSignUp } from "../hooks/useSignUp";

function SignInWrapper() {
  const { t } = useTranslation();
  const [signIn, setSignIn] = useState<boolean>(true);

  const { mutate } = useSignUp();

  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values, "values");
        mutate({ body: values });
      })
      .catch((e) => console.error(e));
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
            <Button
              color="gold"
              variant="solid"
              onClick={() => setSignIn((prevState) => !prevState)}
            >
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

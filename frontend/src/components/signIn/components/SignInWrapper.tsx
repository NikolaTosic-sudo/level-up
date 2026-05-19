import { useState } from "react";
import { useTranslation } from "react-i18next";
import ModalComponent from "../../common/ModalComponent";
import SignInComponent from "./SignInComponent";
import SignUpComponent from "./SignUpComponents";
import { Button, Form, Space } from "antd";

function SignInWrapper() {
  const { t } = useTranslation();
  const [signIn, setSignIn] = useState<boolean>(true);

  const [form] = Form.useForm();

  const handleOk = () => {
    const values = form.getFieldsValue();

    console.log(values, "values");
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
            <Button onClick={() => setSignIn((prevState) => !prevState)}>
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

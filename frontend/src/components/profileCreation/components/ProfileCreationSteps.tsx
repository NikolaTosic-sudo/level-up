import {
  AuditOutlined,
  DeploymentUnitOutlined,
  NodeIndexOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Form, Steps, type StepsProps } from "antd";
import { useTranslation } from "react-i18next";
import {
  CurrentStepsEnum,
  useProfileCreationStore,
} from "../store/useProfileCreationStore";

export const ProfileCreationSteps = () => {
  const { t } = useTranslation();
  const formInstance = Form.useFormInstance();

  const { currentStep, setCurrentStep } = useProfileCreationStore();

  const items: StepsProps["items"] = [
    {
      title: t("profileCreationTrans.steps.userInfo", {
        defaultValue: "User info",
      }),
      icon: <UserOutlined />,
    },
    {
      title: t("profileCreationTrans.steps.skills", {
        defaultValue: "Starting skills",
      }),
      icon: <DeploymentUnitOutlined />,
    },
    {
      title: t("profileCreationTrans.steps.quests", {
        defaultValue: "Daily quests",
      }),
      icon: <NodeIndexOutlined />,
    },
    {
      title: t("profileCreationTrans.steps.finish", {
        defaultValue: "Finish",
      }),
      icon: <AuditOutlined />,
    },
  ];

  function changeStep(current: number) {
    if (currentStep === CurrentStepsEnum.Form) {
      formInstance.validateFields().then(() => setCurrentStep(current));
    } else {
      setCurrentStep(current);
    }
  }

  return (
    <Steps
      style={{ marginBottom: 32 }}
      items={items}
      current={currentStep}
      onChange={changeStep}
    />
  );
};

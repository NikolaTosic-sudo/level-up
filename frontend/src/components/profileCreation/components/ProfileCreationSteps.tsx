import {
  DeploymentUnitOutlined,
  NodeIndexOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Steps, type StepsProps } from "antd";
import { useTranslation } from "react-i18next";
import { useProfileCreationStore } from "../store/useProfileCreationStore";

export const ProfileCreationSteps = () => {
  const { t } = useTranslation();

  const { currentStep, setCurrentStep } = useProfileCreationStore();

  const items: StepsProps["items"] = [
    {
      title: t("profileCreationTrans.steps.userInfo", {
        defaultValue: "User info",
      }),
      status: "process",
      icon: <UserOutlined />,
    },
    {
      title: t("profileCreationTrans.steps.skills", {
        defaultValue: "Starting skills",
      }),
      status: "finish",
      icon: <DeploymentUnitOutlined />,
    },
    {
      title: t("profileCreationTrans.steps.quests", {
        defaultValue: "Daily quests",
      }),
      status: "process",
      icon: <NodeIndexOutlined />,
    },
  ];

  function changeStep(current: number) {
    setCurrentStep(current);
  }

  return <Steps items={items} current={currentStep} onChange={changeStep} />;
};

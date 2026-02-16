import { Button, Flex, Form } from "antd";
import {
  CurrentStepsEnum,
  useProfileCreationStore,
} from "../store/useProfileCreationStore";
import ProfileCreationForm from "./ProfileCreationForm";
import { ProfileCreationSteps } from "./ProfileCreationSteps";
import { useTranslation } from "react-i18next";
import { Activity } from "react";
import ProfileCreationQuests from "./ProfileCreationQuests";
import { ProfileCreationSkills } from "./ProfileCreationSkills";
import { ProfileCreationFinish } from "./ProfileCreationFinish";

const ProfileCreationWrapper = () => {
  const { t } = useTranslation();

  const { currentStep, setCurrentStep } = useProfileCreationStore();
  const [form] = Form.useForm();

  function handleNextStep() {
    if (currentStep !== CurrentStepsEnum.Finish) {
      setCurrentStep(currentStep + 1);
    } else {
      form
        .validateFields()
        .then((values) =>
          alert(`finished with values: ${JSON.stringify(values)}`),
        )
        .catch(
          (reason) => alert(`rejected with reason: ${JSON.stringify(reason)}`), // Problem with <Activity /> component destroying <Form.Items> inside and removing required rules, gotta figure it out
        );
    }
  }

  return (
    <Form
      name="profile-creation"
      colon={false}
      layout="vertical"
      className="profile-creation-wrapper"
      form={form}
    >
      <ProfileCreationSteps />

      <Activity
        mode={currentStep === CurrentStepsEnum.Form ? "visible" : "hidden"}
      >
        <ProfileCreationForm />
      </Activity>

      <Activity
        mode={currentStep === CurrentStepsEnum.Skills ? "visible" : "hidden"}
      >
        <ProfileCreationSkills />
      </Activity>

      <Activity
        mode={currentStep === CurrentStepsEnum.Quests ? "visible" : "hidden"}
      >
        <ProfileCreationQuests />
      </Activity>

      <Activity
        mode={currentStep === CurrentStepsEnum.Finish ? "visible" : "hidden"}
      >
        <ProfileCreationFinish />
      </Activity>

      <Flex style={{ marginTop: 24 }} justify="end" gap={8}>
        <Activity
          mode={currentStep !== CurrentStepsEnum.Form ? "visible" : "hidden"}
        >
          <Button onClick={() => setCurrentStep(currentStep - 1)} danger>
            {t("profileCreationTrans.stepBtn.previous", {
              defaultValue: "Previous step",
            })}
          </Button>
        </Activity>
        <Button type="primary" onClick={handleNextStep}>
          {currentStep !== CurrentStepsEnum.Finish
            ? t("profileCreationTrans.stepBtn.next", {
                defaultValue: "Next step",
              })
            : t("profileCreationTrans.stepBtn.finish", {
                defaultValue: "Finish",
              })}
        </Button>
      </Flex>
    </Form>
  );
};

export default ProfileCreationWrapper;

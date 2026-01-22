import { Button, Flex } from "antd";
import {
  CurrentStepsEnum,
  useProfileCreationStore,
} from "../store/useProfileCreationStore";
import ProfileCreationForm from "./ProfileCreationForm";
import { ProfileCreationSteps } from "./ProfileCreationSteps";
import { useTranslation } from "react-i18next";
import { Activity } from "react";

const ProfileCreationWrapper = () => {
  const { t } = useTranslation();

  const { currentStep, setCurrentStep } = useProfileCreationStore();

  function handleNextStep() {
    if (currentStep !== CurrentStepsEnum.Finish) {
      setCurrentStep(currentStep + 1);
    } else {
      alert("finished");
    }
  }

  return (
    <div className="profile-creation-wrapper">
      <ProfileCreationSteps />

      <Activity
        mode={currentStep === CurrentStepsEnum.Form ? "visible" : "hidden"}
      >
        <ProfileCreationForm />
      </Activity>

      <Activity
        mode={currentStep === CurrentStepsEnum.Skills ? "visible" : "hidden"}
      >
        <div>Skills</div>
      </Activity>

      <Activity
        mode={currentStep === CurrentStepsEnum.Quests ? "visible" : "hidden"}
      >
        <div>Quests</div>
      </Activity>

      <Activity
        mode={currentStep === CurrentStepsEnum.Finish ? "visible" : "hidden"}
      >
        <div>Finish</div>
      </Activity>

      <Flex justify="end" gap={8}>
        {currentStep !== CurrentStepsEnum.Form && (
          <Button onClick={() => setCurrentStep(currentStep - 1)} danger>
            {t("profileCreationTrans.stepBtn.previous", {
              defaultValue: "Previous step",
            })}
          </Button>
        )}
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
    </div>
  );
};

export default ProfileCreationWrapper;

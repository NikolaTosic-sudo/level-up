import { Button, Flex } from "antd";
import {
  CurrentStepsEnum,
  useProfileCreationStore,
} from "../store/useProfileCreationStore";
import ProfileCreationForm from "./ProfileCreationForm";
import { ProfileCreationSteps } from "./ProfileCreationSteps";
import { useTranslation } from "react-i18next";

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

      {currentStep === CurrentStepsEnum.Form ? (
        <ProfileCreationForm />
      ) : currentStep === CurrentStepsEnum.Skills ? (
        <div>Skills</div>
      ) : currentStep === CurrentStepsEnum.Quests ? (
        <div>Quests</div>
      ) : (
        <div>Finish</div>
      )}

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

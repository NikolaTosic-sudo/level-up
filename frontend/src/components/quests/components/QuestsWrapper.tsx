import type { MainQuestsReponse } from "../../../api";
import RepeatingQuests from "./RepeatingQuests";
import CustomQuests from "./CustomQuests";

type QuestsWrapperProps = {
  quests: MainQuestsReponse;
};

function QuestsWrapper({ quests }: QuestsWrapperProps) {
  return (
    <>
      <RepeatingQuests quests={quests.repeatingQuests} />
      <CustomQuests quests={quests.customQuests} />
    </>
  );
}

export default QuestsWrapper;

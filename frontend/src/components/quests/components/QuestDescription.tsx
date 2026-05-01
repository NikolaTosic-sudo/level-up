import type { Quest } from "./Quest";

type QuestDescrptionProps = {
  quest: Quest;
};

function QuestDescrption({ quest }: QuestDescrptionProps) {
  return <div>{quest.title}</div>;
}

export default QuestDescrption;

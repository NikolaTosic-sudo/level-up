import { useGetQuests } from "../hooks/useGetQuests";
import QuestsWrapper from "./QuestsWrapper";
import LoadingComponent from "../../common/LoadingComponents";
import ErrorComponent from "../../common/ErrorComponent";

function QuestsLoader() {
  const { data, isError, isLoading, error } = useGetQuests();

  if (isError) {
    return <ErrorComponent error={error} />;
  }

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (!data) {
    return null;
  }

  return <QuestsWrapper quests={data} />;
}

export default QuestsLoader;

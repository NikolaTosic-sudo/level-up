import ErrorComponent from "../../common/ErrorComponent";
import LoadingComponent from "../../common/LoadingComponents";
import { useGetUsersSkills } from "../hooks/useGetSkill";
import SkillsWrapper from "./SkillsWrapper";

function SkillsLoader() {
  const { data, isLoading, error, isError } = useGetUsersSkills();

  if (isError) {
    return <ErrorComponent error={error} />;
  }

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (!data) {
    return null;
  }

  return <SkillsWrapper skills={data.skills} />;
}

export default SkillsLoader;

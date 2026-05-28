import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { skillsApi } from "../../../types/newApi";
import type { Mode } from "../components/SelectSkills";

export const useGetSkills = (
  name: string,
  mode?: Mode,
  userSkills?: number[],
) => {
  const api = useRef(skillsApi);

  const fetchData = async () => {
    if (mode == "excludeSelectedUsersSkills") {
      return await api.current.v1LevelupApiUserSkillsExcludeGet({
        name,
        excludeIds: userSkills,
      });
    } else if (mode === "excludeAllUsersSkills") {
      return await api.current.v1LevelupApiSkillsNotUserGet({
        name,
      });
    } else {
      return await api.current.v1LevelupApiSkillsGet({ name });
    }
  };

  return useQuery({
    queryKey: ["useGetSkills", name, mode],
    queryFn: fetchData,
    staleTime: 5 * 60 * 1000,
  });
};

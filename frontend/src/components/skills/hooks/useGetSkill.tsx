import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { skillsApi } from "../../../types/newApi";

export const useGetUsersSkills = () => {
  const api = useRef(skillsApi);

  const fetchData = async () => {
    return await api.current.v1LevelupApiUserSkillsGet();
  };

  return useQuery({
    queryKey: ["useGetUsersSkills"],
    queryFn: fetchData,
    staleTime: 5 * 60 * 1000,
  });
};

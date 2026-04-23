import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { SkillsApi } from "../../../api/apis/SkillsApi";

export const useGetSkills = (name: string, forUser?: boolean) => {
  const api = useRef(new SkillsApi());

  const fetchData = async () => {
    if (forUser) {
      return await api.current.v1LevelupApiSkillsGet({ name });
    } else {
      return await api.current.v1LevelupApiSkillsGet({ name });
    }
  };

  return useQuery({
    queryKey: ["useGetSkills", name],
    queryFn: fetchData,
    staleTime: 5 * 60 * 1000,
  });
};

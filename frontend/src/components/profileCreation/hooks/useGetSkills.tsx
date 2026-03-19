import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { SkillsApi } from "../../../api/apis/SkillsApi";

export const useGetSkills = (name: string) => {
  const api = useRef(new SkillsApi());

  const fetchData = async () => {
    return await api.current.v1LevelupApiSkillsGet({ name });
  };

  return useQuery({
    queryKey: ["useGetSkills", name],
    queryFn: fetchData,
    staleTime: 5 * 60 * 1000,
  });
};

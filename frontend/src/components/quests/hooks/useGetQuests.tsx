import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { questsApi } from "../../../types/newApi";

export const useGetQuests = () => {
  const api = useRef(questsApi);

  const fetchData = async () => {
    return await api.current.v1LevelupApiQuestsGet();
  };

  return useQuery({
    queryKey: ["useGetQuests"],
    queryFn: fetchData,
    staleTime: 5 * 60 * 1000,
  });
};

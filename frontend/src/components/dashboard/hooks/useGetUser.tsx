import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { playerApi } from "../../../types/newApi";

export const useGetUser = () => {
  const api = useRef(playerApi);

  const fetchData = async () => {
    return await api.current.v1LevelupApiUserProfileGet();
  };

  return useQuery({
    queryKey: ["useGetUser"],
    queryFn: fetchData,
    staleTime: 5 * 60 * 1000,
  });
};

import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { playerApi } from "../../../types/newApi";

export const useGetUserInfo = () => {
  const api = useRef(playerApi);

  const fetchData = async () => {
    return await api.current.v1LevelupApiUserInfoGet();
  };

  return useQuery({
    queryKey: ["useGetUserInfo"],
    queryFn: fetchData,
    staleTime: 5 * 60 * 1000,
  });
};

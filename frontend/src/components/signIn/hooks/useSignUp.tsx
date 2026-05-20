import { useRef } from "react";
import { LoginApi, type V1LevelupApiSignUpPostRequest } from "../../../api";
import { useMutation } from "@tanstack/react-query";

export function useSignUp() {
  const api = useRef(new LoginApi());

  const mutation = useMutation({
    mutationFn: (data: V1LevelupApiSignUpPostRequest) => {
      return api.current.v1LevelupApiSignUpPost(data);
    },
    onSuccess: () => alert("success"),
    onError: (e) => console.log(e),
  });

  return mutation;
}

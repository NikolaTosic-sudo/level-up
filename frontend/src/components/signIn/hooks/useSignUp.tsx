import { useRef } from "react";
import { LoginApi, type V1LevelupApiSignUpPostRequest } from "../../../api";
import { useMutation } from "@tanstack/react-query";
import { getTheError, type ApiError } from "../../common/ErrorMessageComponent";
import { message } from "antd";

export function useSignUp() {
  const api = useRef(new LoginApi());

  const mutation = useMutation({
    mutationFn: (data: V1LevelupApiSignUpPostRequest) => {
      return api.current.v1LevelupApiSignUpPost(data);
    },
    onSuccess: () => message.success("Success"),
    onError: async (e: ApiError) => {
      const mes = await getTheError(e);

      message.error(mes);
    },
  });

  return mutation;
}

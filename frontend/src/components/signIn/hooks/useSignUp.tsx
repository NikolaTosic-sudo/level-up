import { useRef } from "react";
import {
  LoginApi,
  type MainLoginResponse,
  type V1LevelupApiLogInPostRequest,
  type V1LevelupApiSignUpPostRequest,
} from "../../../api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import ErrorMessageComponent, {
  type ApiError,
} from "../../common/ErrorMessageComponent";
import { message } from "antd";
import { useTranslation } from "react-i18next";

export function useSignUp(isSignIn: boolean) {
  const api = useRef(new LoginApi());
  const { t } = useTranslation();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (
      data: V1LevelupApiSignUpPostRequest | V1LevelupApiLogInPostRequest,
    ) => {
      return isSignIn
        ? api.current.v1LevelupApiLogInPost(data)
        : api.current.v1LevelupApiSignUpPost(data);
    },
    onSuccess: (data: MainLoginResponse) => {
      message.success(
        t("", {
          defaultValue:
            "Successful {{mode}}. The page will redirect you to the profile page",
          mode: isSignIn ? "sign in" : "sign up",
        }),
      );

      setTimeout(() => {
        navigate({ href: data.redirect });
      }, 1000);
    },
    onError: async (e: ApiError) => {
      message.error(<ErrorMessageComponent error={e} />);
    },
  });

  return mutation;
}

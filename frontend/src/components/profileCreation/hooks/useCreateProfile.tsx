import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import ErrorMessageComponent, {
  type ApiError,
} from "../../common/ErrorMessageComponent";
import { message } from "antd";
import {
  type MainLoginResponse,
  type V1LevelupApiCreateProfilePostRequest,
} from "../../../api";
import { playerApi } from "../../../types/newApi";

export function useCreateProfile() {
  const api = useRef(playerApi);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: V1LevelupApiCreateProfilePostRequest) =>
      api.current.v1LevelupApiCreateProfilePost(data),
    onSuccess: (data: MainLoginResponse) => {
      message.success(
        t("", {
          defaultValue:
            "Successfully created profile. Redirecting to profile page...",
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

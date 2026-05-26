import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import ErrorMessageComponent, {
  type ApiError,
} from "../../common/ErrorMessageComponent";
import { message } from "antd";
import { type V1LevelupApiUpdateUserPostRequest } from "../../../api";
import { playerApi } from "../../../types/newApi";

export function useUpdateUser() {
  const api = useRef(playerApi);
  const { t } = useTranslation();
  const query = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: V1LevelupApiUpdateUserPostRequest) =>
      api.current.v1LevelupApiUpdateUserPost(data),
    onSuccess: () => {
      message.success(
        t("", {
          defaultValue: "Successfully updated profile",
        }),
      );

      query.invalidateQueries({ queryKey: ["useGetUser"] });
    },
    onError: async (e: ApiError) => {
      message.error(<ErrorMessageComponent error={e} />);
    },
  });

  return mutation;
}

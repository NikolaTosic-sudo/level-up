import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import ErrorMessageComponent, {
  type ApiError,
} from "../../common/ErrorMessageComponent";
import { message } from "antd";
import { questsApi } from "../../../types/newApi";
import type { V1LevelupApiUserQuestCreationPostRequest } from "../../../api";

export function useEditQuest() {
  const api = useRef(questsApi);
  const { t } = useTranslation();
  const query = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: V1LevelupApiUserQuestCreationPostRequest) =>
      api.current.v1LevelupApiUserQuestCreationPost(data),
    onSuccess: (_, data) => {
      message.success(
        data.body.id
          ? t("", { defaultValue: "Successfully edited quest." })
          : t("", {
              defaultValue: "Successfully created quest.",
            }),
      );

      query.invalidateQueries({
        queryKey: ["useGetQuests"],
      });
    },
    onError: async (e: ApiError) => {
      message.error(<ErrorMessageComponent error={e} />);
    },
  });

  return mutation;
}

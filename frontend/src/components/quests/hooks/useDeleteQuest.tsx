import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import ErrorMessageComponent, {
  type ApiError,
} from "../../common/ErrorMessageComponent";
import { App } from "antd";
import { questsApi } from "../../../types/newApi";

export function useDeleteQuest() {
  const api = useRef(questsApi);
  const { t } = useTranslation();
  const query = useQueryClient();
  const { message } = App.useApp();

  const mutation = useMutation({
    mutationFn: (id: number) =>
      api.current.v1LevelupApiUserQuestIdDeleteDelete({ id }),
    onSuccess: () => {
      message.success(t("", { defaultValue: "Successfully removed quest." }));

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

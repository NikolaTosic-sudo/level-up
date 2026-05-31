import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import ErrorMessageComponent, {
  type ApiError,
} from "../../common/ErrorMessageComponent";
import { App } from "antd";
import { questsApi } from "../../../types/newApi";

export function useCompleteSubQuest() {
  const api = useRef(questsApi);
  const { t } = useTranslation();
  const query = useQueryClient();
  const { message } = App.useApp();

  const mutation = useMutation({
    mutationFn: (id: number) =>
      api.current.v1LevelupApiUserQuestIdCompleteSubquestPost({ id }),
    onSuccess: ({ leveledUpTimes }) => {
      message.success(
        t("", {
          defaultValue: "Successfully completed sub-quest.",
        }),
      );

      if (leveledUpTimes && leveledUpTimes > 0) {
        for (let i = 0; i < leveledUpTimes; i++) {
          setTimeout(
            () =>
              message.success(
                t("", {
                  defaultValue: "Level up!",
                }),
              ),
            200 * i + 600,
          );
        }
      }

      query.invalidateQueries();
    },
    onError: async (e: ApiError) => {
      message.error(<ErrorMessageComponent error={e} />);
    },
  });

  return mutation;
}

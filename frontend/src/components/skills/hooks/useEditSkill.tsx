import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import ErrorMessageComponent, {
  type ApiError,
} from "../../common/ErrorMessageComponent";
import { message } from "antd";
import { skillsApi } from "../../../types/newApi";
import type { V1LevelupApiCreateSkillPostRequest } from "../../../api";

export function useEditSkill() {
  const api = useRef(skillsApi);
  const { t } = useTranslation();
  const query = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: V1LevelupApiCreateSkillPostRequest) =>
      api.current.v1LevelupApiCreateSkillPost(data),
    onSuccess: () => {
      message.success(
        t("", {
          defaultValue: "Successfully created skill, refreshing...",
        }),
      );

      query.invalidateQueries({ queryKey: ["useGetSkill"] });
    },
    onError: async (e: ApiError) => {
      message.error(<ErrorMessageComponent error={e} />);
    },
  });

  return mutation;
}

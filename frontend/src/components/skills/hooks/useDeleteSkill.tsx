import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import ErrorMessageComponent, {
  type ApiError,
} from "../../common/ErrorMessageComponent";
import { message } from "antd";
import { skillsApi } from "../../../types/newApi";
import type { V1LevelupApiSkillIdDeactivateDeleteRequest } from "../../../api";

export function useDeleteSkill() {
  const api = useRef(skillsApi);
  const { t } = useTranslation();
  const query = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: V1LevelupApiSkillIdDeactivateDeleteRequest) =>
      api.current.v1LevelupApiSkillIdDeactivateDelete(data),
    onSuccess: () => {
      message.success(t("", { defaultValue: "Successfully removed skill." }));

      query.invalidateQueries({
        queryKey: ["useGetUsersSkills"],
      });

      query.invalidateQueries({
        queryKey: ["useGetSkills"],
      });
    },
    onError: async (e: ApiError) => {
      message.error(<ErrorMessageComponent error={e} />);
    },
  });

  return mutation;
}

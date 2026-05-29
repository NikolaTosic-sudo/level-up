import { Progress, Tooltip } from "antd";
import type { MainPlayerInfoResponse } from "../../../api";

type ProfileProgressProps = {
  user: MainPlayerInfoResponse;
};

function ProfileProgress({ user }: ProfileProgressProps) {
  return (
    <>
      <Tooltip title={`${user.experience} / ${user.experienceNeeded} XP`}>
        <Progress
          percent={
            ((user.experience ?? 1) / (user.experienceNeeded ?? 1)) * 100
          }
          showInfo={false}
          size={{ height: 10 }}
        />
      </Tooltip>
      <Tooltip title={`${user.experience} / ${user.experienceNeeded} XP`}>
        <span style={{ marginLeft: -12 }}>{user.level}</span>
      </Tooltip>
    </>
  );
}

export default ProfileProgress;

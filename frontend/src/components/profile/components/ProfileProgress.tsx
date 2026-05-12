import { Progress, Tooltip } from "antd";
import type { User } from "./ProfileHeader";

type ProfileProgressProps = {
  user: User;
};

function ProfileProgress({ user }: ProfileProgressProps) {
  return (
    <>
      <Tooltip title={`${user.experience} / ${user.experienceNeeded} XP`}>
        <Progress
          percent={(user.experience / user.experienceNeeded) * 100}
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

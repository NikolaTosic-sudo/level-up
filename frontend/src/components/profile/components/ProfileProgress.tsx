import { Progress, Tooltip } from "antd";

function ProfileProgress() {
  return (
    <>
      <Tooltip title="60 / 100 XP">
        <Progress
          percent={(60 / 100) * 100}
          showInfo={false}
          size={{ height: 10 }}
        />
      </Tooltip>
      <Tooltip title="60 / 100 XP">
        <span style={{ marginLeft: -12 }}>70</span>
      </Tooltip>
    </>
  );
}

export default ProfileProgress;

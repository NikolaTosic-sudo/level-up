import { Layout, Progress, Tooltip } from "antd";
import ProfileNotifications from "./ProfileNotifications";

const { Header } = Layout;

function ProfileHeader() {
  return (
    <Header className="profile-header">
      <ProfileNotifications />
      <Tooltip title="60 / 100 XP">
        <Progress
          percent={(60 / 100) * 100}
          showInfo={false}
          strokeColor="#008c95"
          size={{ height: 10 }}
        />
      </Tooltip>
    </Header>
  );
}

export default ProfileHeader;

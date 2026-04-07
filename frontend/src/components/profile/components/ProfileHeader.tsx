import { Layout, Progress, Tooltip } from "antd";
import ProfileNotifications from "./ProfileNotifications";
import ProfileShop from "./ProfileShop";

const { Header } = Layout;

function ProfileHeader() {
  return (
    <Header className="profile-header">
      <ProfileNotifications />
      <ProfileShop />
      <Tooltip title="60 / 100 XP">
        <Progress
          percent={(60 / 100) * 100}
          showInfo={false}
          strokeColor="#008c95"
          size={{ height: 10 }}
        />
      </Tooltip>
      <Tooltip title="60 / 100 XP">
        <span style={{ marginLeft: -12 }}>70</span>
      </Tooltip>
    </Header>
  );
}

export default ProfileHeader;

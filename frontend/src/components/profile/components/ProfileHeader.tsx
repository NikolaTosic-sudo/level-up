import { Layout, Progress } from "antd";
import ProfileNotifications from "./ProfileNotifications";

const { Header } = Layout;

function ProfileHeader() {
  return (
    <Header className="profile-header">
      <ProfileNotifications />
      <Progress
        percent={60}
        showInfo={false}
        strokeColor="#008c95"
        styles={{
          rail: {
            height: 10,
          },
          track: {
            height: 10,
          },
        }}
      />
    </Header>
  );
}

export default ProfileHeader;

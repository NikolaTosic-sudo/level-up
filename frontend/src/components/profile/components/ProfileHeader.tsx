import { Layout } from "antd";
import ProfileNotifications from "./ProfileNotifications";

const { Header } = Layout;

function ProfileHeader() {
  return (
    <Header className="profile-header">
      <ProfileNotifications />
    </Header>
  );
}

export default ProfileHeader;

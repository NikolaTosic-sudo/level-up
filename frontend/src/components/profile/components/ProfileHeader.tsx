import { Layout } from "antd";
import ProfileNotifications from "./ProfileNotifications";
import ProfileShop from "./ProfileShop";
import ProfileProgress from "./ProfileProgress";

const { Header } = Layout;

function ProfileHeader() {
  return (
    <Header className="profile-header">
      <ProfileNotifications />
      <ProfileShop />
      <ProfileProgress />
    </Header>
  );
}

export default ProfileHeader;

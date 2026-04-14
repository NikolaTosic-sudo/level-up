import { Layout } from "antd";
import ProfileNotifications from "./ProfileNotifications";
import ProfileShop from "./ProfileShop";
import ProfileProgress from "./ProfileProgress";
import MuteButton from "../../common/MuteButton";

const { Header } = Layout;

function ProfileHeader() {
  return (
    <Header className="profile-header">
      <MuteButton />
      <ProfileNotifications />
      <ProfileShop />
      <ProfileProgress />
      <div>Nikola Tosic</div>
    </Header>
  );
}

export default ProfileHeader;

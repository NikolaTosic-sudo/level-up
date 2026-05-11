import { Layout } from "antd";
import ProfileNotifications from "./ProfileNotifications";
import ProfileShop from "./ProfileShop";
import ProfileProgress from "./ProfileProgress";
import MuteButton from "../../common/MuteButton";
import { FireOutlined } from "@ant-design/icons";

const { Header } = Layout;

function ProfileHeader() {
  return (
    <Header className="profile-header">
      <MuteButton />
      <ProfileNotifications />
      <ProfileShop />
      <ProfileProgress />
      <div>Nikola Tosic</div>
      <div>
        <FireOutlined className="fire-icon" />
        <span style={{ marginLeft: 4 }}>12</span>
      </div>
    </Header>
  );
}

export default ProfileHeader;

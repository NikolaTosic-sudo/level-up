import { Layout } from "antd";
import ProfileNotifications from "./ProfileNotifications";
import ProfileShop from "./ProfileShop";
import ProfileProgress from "./ProfileProgress";
import MuteButton from "../../common/MuteButton";
import { FireFilled, FireOutlined } from "@ant-design/icons";
import user from "./userPartially.json";

const { Header } = Layout;

export type User = {
  id: string;
  name: string;
  experience: number;
  experienceNeeded: number;
  level: number;
  hotStreak: number;
};

function ProfileHeader() {
  return (
    <Header className="profile-header">
      <MuteButton />
      <ProfileNotifications />
      <ProfileShop />
      <ProfileProgress user={user} />
      <div>{user.name}</div>
      <div>
        {!user.hotStreak || user.hotStreak === 0 ? (
          <FireOutlined />
        ) : (
          <FireFilled className="fire-icon" />
        )}
        <span style={{ marginLeft: 4 }}>{user.hotStreak}</span>
      </div>
    </Header>
  );
}

export default ProfileHeader;

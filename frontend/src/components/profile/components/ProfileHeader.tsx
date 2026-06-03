import { Layout } from "antd";
import ProfileNotifications from "./ProfileNotifications";
import ProfileShop from "./ProfileShop";
import ProfileProgress from "./ProfileProgress";
import MuteButton from "../../common/MuteButton";
import { FireFilled, FireOutlined } from "@ant-design/icons";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import LoadingComponent from "../../common/LoadingComponents";
import { useTranslation } from "react-i18next";

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
  const { data: user, isLoading } = useGetUserInfo();

  const { t } = useTranslation();

  return (
    <Header className="profile-header">
      <MuteButton />
      <ProfileNotifications />
      <ProfileShop />
      {isLoading ? (
        <LoadingComponent style={{ width: "auto" }} />
      ) : (
        <>
          {user ? <ProfileProgress user={user} /> : null}
          <div>{user ? user.name : t("", { defaultValue: "Unknown" })}</div>
          <div>
            {!user?.hotStreak || user.hotStreak === 0 ? (
              <FireOutlined />
            ) : (
              <FireFilled className="fire-icon" />
            )}
            <span style={{ marginLeft: 4 }}>{user ? user.hotStreak : 0}</span>
          </div>
        </>
      )}
    </Header>
  );
}

export default ProfileHeader;

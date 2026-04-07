import { Layout } from "antd";
import { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import ProfileMenu from "./ProfileMenu";

const { Sider } = Layout;

function ProfileWrapper() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 1080);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout hasSider className="profile-layout">
      <Sider
        className="profile-sider"
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <ProfileMenu />
      </Sider>
      <Layout>
        <ProfileHeader />
        <ProfileContent />
      </Layout>
    </Layout>
  );
}

export default ProfileWrapper;

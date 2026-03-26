import {
  DashboardOutlined,
  ReconciliationOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, type MenuProps } from "antd";
import { useState } from "react";
import { useProfileWrapStore } from "../store/useProfileWrapStore";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";

type MenuItem = Required<MenuProps>["items"][number];

const { Sider } = Layout;

function ProfileWrapper() {
  const { currentModule, setCurrentModule } = useProfileWrapStore();
  const [collapsed, setCollapsed] = useState(false);

  const items: MenuItem[] = [
    {
      label: "Dashboard",
      key: "dash",
      icon: <DashboardOutlined />,
    },
    {
      label: "Skills",
      key: "skills",
      icon: <ThunderboltOutlined />,
    },
    {
      label: "Tasks",
      key: "tasks",
      icon: <ReconciliationOutlined />,
    },
    {
      label: "Profile",
      key: "profile",
      icon: <UserOutlined />,
    },
  ];

  return (
    <Layout className="profile-layout">
      <Sider
        className="profile-sider"
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <Menu
          defaultSelectedKeys={["dash"]}
          items={items}
          mode="inline"
          theme="dark"
          selectedKeys={[currentModule]}
          onSelect={({ key }) => setCurrentModule(key)}
        />
      </Sider>
      <Layout>
        <ProfileHeader />
        <ProfileContent />
      </Layout>
    </Layout>
  );
}

export default ProfileWrapper;

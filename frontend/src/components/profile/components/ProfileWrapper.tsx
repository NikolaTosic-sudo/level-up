import {
  DashboardOutlined,
  ReconciliationOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { Layout, Menu, type MenuProps } from "antd";
import { useState } from "react";
import { useProfileWrapStore } from "../store/useProfileWrapStore";

type MenuItem = Required<MenuProps>["items"][number];

const { Sider, Header, Content } = Layout;

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
        <Header className="profile-header">test header</Header>
        <Content className="profile-content">test content</Content>
      </Layout>
    </Layout>
  );
}

export default ProfileWrapper;

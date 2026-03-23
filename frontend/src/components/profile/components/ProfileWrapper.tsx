import { Layout, Menu, type MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const { Sider } = Layout;

function ProfileWrapper() {
  const items: MenuItem[] = [
    {
      label: "Dashboard",
      key: "dash",
    },
    {
      label: "Skills",
      key: "skills",
    },
  ];

  return (
    <Layout>
      <Sider>
        <Menu items={items} mode="inline" theme="dark" />
      </Sider>
    </Layout>
  );
}

export default ProfileWrapper;

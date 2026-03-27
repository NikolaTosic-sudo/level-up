import { Menu, type MenuProps } from "antd";
import {
  DashboardOutlined,
  ReconciliationOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useProfileWrapStore } from "../store/useProfileWrapStore";

type MenuItem = Required<MenuProps>["items"][number];

function ProfileMenu() {
  const { currentModule, setCurrentModule } = useProfileWrapStore();

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
    <Menu
      defaultSelectedKeys={["dash"]}
      items={items}
      mode="inline"
      theme="dark"
      selectedKeys={[currentModule]}
      onSelect={({ key }) => setCurrentModule(key)}
    />
  );
}

export default ProfileMenu;

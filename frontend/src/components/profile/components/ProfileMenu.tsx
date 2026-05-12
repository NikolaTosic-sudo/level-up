import { Menu, type MenuProps } from "antd";
import {
  DashboardOutlined,
  HistoryOutlined,
  ReconciliationOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useProfileWrapStore } from "../store/useProfileWrapStore";
import { useTranslation } from "react-i18next";

type MenuItem = Required<MenuProps>["items"][number];

function ProfileMenu() {
  const { t } = useTranslation();
  const { currentModule, setCurrentModule } = useProfileWrapStore();

  const items: MenuItem[] = [
    {
      label: t("profile.menu.dashboard", { defaultValue: "Dashboard" }),
      key: "dash",
      icon: <DashboardOutlined />,
    },
    {
      label: t("profile.menu.skills", { defaultValue: "Skills" }),
      key: "skills",
      icon: <ThunderboltOutlined />,
    },
    {
      label: t("profile.menu.quests", { defaultValue: "Quests" }),
      key: "quests",
      icon: <ReconciliationOutlined />,
    },
    {
      label: t("profile.menu.history", { defaultValue: "History" }),
      key: "history",
      icon: <HistoryOutlined />,
    },
    {
      label: t("profile.menu.profile", { defaultValue: "Profile" }),
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

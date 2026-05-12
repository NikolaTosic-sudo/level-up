import { BellOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Divider,
  Dropdown,
  Flex,
  Tooltip,
  Typography,
  type MenuProps,
} from "antd";
import { useTranslation } from "react-i18next";
import NotificationsIcon, { type iconType } from "./NotificationsIcon";
import notifications from "./notifications.json";

function ProfileNotifications() {
  const { t } = useTranslation();

  const items: MenuProps["items"] = notifications.map((n) => ({
    key: n.id,
    label: n.title,
    title: n.title,
    icon: <NotificationsIcon iconType={n.iconType as iconType} />,
    extra: (
      <Typography.Text
        ellipsis={{ tooltip: true }}
        className="notifications-extra"
      >
        {n.description}
      </Typography.Text>
    ),
  }));

  return (
    <Tooltip
      title={t("profile.header.notifications.title", {
        defaultValue: "Notifications",
      })}
    >
      <Dropdown
        menu={{ items }}
        trigger={["click"]}
        popupRender={(menu) => (
          <>
            <Flex justify="space-between" align="center">
              {t("profile.header.notifications.title", {
                defaultValue: "Notifications",
              })}
              <Button type="link" className="notifications-readall">
                {t("profile.header.notifications.readAll", {
                  defaultValue: "Read all",
                })}
              </Button>
            </Flex>
            <Divider size="middle" />
            {menu}
          </>
        )}
      >
        <Badge count={notifications.length} size="small" color="#008c95">
          <BellOutlined style={{ fontSize: 18 }} />
        </Badge>
      </Dropdown>
    </Tooltip>
  );
}

export default ProfileNotifications;

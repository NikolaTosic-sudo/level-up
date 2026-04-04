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
import NotificationsIcon from "./NotificationsIcon";

function ProfileNotifications() {
  const { t } = useTranslation();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "first item",
      title: "Ovo je title",
      icon: <NotificationsIcon iconType="reward" />,
      extra: (
        <Typography.Text
          ellipsis={{ tooltip: true }}
          className="notifications-text"
        >
          extra je ovo neka bude jos vece
        </Typography.Text>
      ),
    },
    {
      key: "2",
      label: "second item",
    },

    {
      key: "3",
      label: "third item",
    },
  ];

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
        <Badge count={items.length} size="small" color="#008c95">
          <BellOutlined style={{ fontSize: 18 }} />
        </Badge>
      </Dropdown>
    </Tooltip>
  );
}

export default ProfileNotifications;

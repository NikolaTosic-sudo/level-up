import { BellOutlined, DeliveredProcedureOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Divider,
  Dropdown,
  Flex,
  Tooltip,
  type MenuProps,
} from "antd";
import { useTranslation } from "react-i18next";

function ProfileNotifications() {
  const { t } = useTranslation();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "first item",
      title: "Ovo je title",
      icon: <DeliveredProcedureOutlined />,
      extra: <div>extra je ovo</div>,
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
      title={t("profile.header.notifications", {
        defaultValue: "Notifications",
      })}
    >
      <Dropdown
        menu={{ items }}
        trigger={["click"]}
        popupRender={(menu) => (
          <>
            <Flex justify="space-between" align="center">
              {t("profile.header.notifications", {
                defaultValue: "Notifications",
              })}
              <Button type="link">Read all</Button>
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

import { BellOutlined } from "@ant-design/icons";
import { Badge, Dropdown, type MenuProps } from "antd";

function ProfileNotifications() {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "first item",
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
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Badge count={items.length} size="small">
        <BellOutlined style={{ fontSize: 18 }} />
      </Badge>
    </Dropdown>
  );
}

export default ProfileNotifications;

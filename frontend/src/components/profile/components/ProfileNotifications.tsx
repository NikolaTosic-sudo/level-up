import { BellOutlined, DeliveredProcedureOutlined } from "@ant-design/icons";
import { Badge, Divider, Dropdown, type MenuProps } from "antd";

function ProfileNotifications() {
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
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      popupRender={(menu) => (
        <>
          <div>Notifications</div>
          <Divider size="middle" />
          {menu}
        </>
      )}
    >
      <Badge count={items.length} size="small" color="#008c95">
        <BellOutlined style={{ fontSize: 18 }} />
      </Badge>
    </Dropdown>
  );
}

export default ProfileNotifications;

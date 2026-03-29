import { BellOutlined } from "@ant-design/icons";
import { Dropdown, Layout, type MenuProps } from "antd";

const { Header } = Layout;

function ProfileHeader() {
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
    <Header className="profile-header">
      Test header
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <BellOutlined />
        </a>
      </Dropdown>
    </Header>
  );
}

export default ProfileHeader;

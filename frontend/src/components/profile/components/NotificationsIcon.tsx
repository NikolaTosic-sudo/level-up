import { GiftOutlined, VideoCameraOutlined } from "@ant-design/icons";

type NotificationsIconProps = {
  iconType: "reward" | "task"; // will be expanded
};

const Icons = {
  reward: <GiftOutlined />,
  task: <VideoCameraOutlined />,
};

const NotificationsIcon = ({ iconType }: NotificationsIconProps) => {
  const icon = Icons[iconType];

  return icon;
};

export default NotificationsIcon;

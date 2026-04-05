import { GiftOutlined, VideoCameraOutlined } from "@ant-design/icons";

type NotificationsIconProps = {
  iconType: "reward" | "task" | "failure"; // will be expanded
};

const Icons = {
  reward: <GiftOutlined />,
  task: <VideoCameraOutlined />,
  failure: <div />,
};

const NotificationsIcon = ({ iconType }: NotificationsIconProps) => {
  const icon = Icons[iconType];

  return icon;
};

export default NotificationsIcon;

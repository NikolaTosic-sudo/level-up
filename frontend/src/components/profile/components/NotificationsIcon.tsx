import { GiftOutlined, VideoCameraOutlined } from "@ant-design/icons";

export type iconType = "reward" | "task" | "failure";

type NotificationsIconProps = {
  iconType: iconType; // will be expanded
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

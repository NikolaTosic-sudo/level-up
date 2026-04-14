import { Button, Tooltip } from "antd";
import { useGlobalStore } from "../../store/useGlobalStore";
import { MutedOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

type MuteButtonProps = {
  size?: number;
};

function MuteButton({ size }: MuteButtonProps) {
  const { muted, setMuted } = useGlobalStore();
  const { t } = useTranslation();

  const title = muted
    ? t("global.unmute", { defaultValue: "Unmute application audio" })
    : t("global.mute", { defaultValue: "Mute application audio" });

  return (
    <Tooltip title={title}>
      <Button type="text" onClick={() => setMuted(!muted)}>
        <MutedOutlined
          style={{ fontSize: size ?? 18, color: muted ? "#008c95" : "inherit" }}
        />
      </Button>
    </Tooltip>
  );
}

export default MuteButton;

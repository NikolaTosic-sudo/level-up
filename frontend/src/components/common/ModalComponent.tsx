import {
  Button,
  Divider,
  Modal,
  Tooltip,
  Typography,
  type ButtonProps,
  type ModalProps,
} from "antd";
import { useState, type MouseEvent, type ReactElement } from "react";
import { useSound } from "../../hooks/useSound";
import openSound from "../../assets/popup.wav";
import closeSound from "../../assets/close.wav";

type ModalComponentProps = {
  buttonInner: ReactElement | string;
  buttonProps?: ButtonProps;
  buttonTooltip?: ReactElement | string;
  noDivider?: boolean;
};

function ModalComponent({
  children,
  buttonInner,
  buttonProps,
  buttonTooltip,
  onCancel,
  title,
  noDivider,
  ...props
}: ModalComponentProps & ModalProps) {
  const [open, setOpen] = useState(false);
  const [openPlay, closePlay] = useSound(openSound, closeSound);

  function handleOpen(e: MouseEvent) {
    e.stopPropagation();
    setOpen(true);
    if (openPlay) {
      openPlay();
    }
  }

  function handleClose(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setOpen(false);
    if (closePlay) {
      closePlay();
    }
    if (onCancel) {
      onCancel(e);
    }
  }

  return (
    <>
      <Tooltip title={buttonTooltip}>
        <Button {...buttonProps} onClick={handleOpen}>
          {buttonInner}
        </Button>
      </Tooltip>
      <Modal
        closable={false}
        cancelButtonProps={{ danger: true, type: "primary" }}
        {...props}
        open={open}
        onCancel={handleClose}
        title={
          title ? (
            <div onClick={(e) => e.stopPropagation()}>
              <Typography.Title level={4}>{title}</Typography.Title>
              {noDivider ? null : <Divider />}
            </div>
          ) : null
        }
      >
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </Modal>
    </>
  );
}

export default ModalComponent;

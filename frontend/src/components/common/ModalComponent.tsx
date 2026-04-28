import {
  Button,
  Modal,
  Tooltip,
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
};

function ModalComponent({
  children,
  buttonInner,
  buttonProps,
  buttonTooltip,
  onCancel,
  ...props
}: ModalComponentProps & ModalProps) {
  const [open, setOpen] = useState(false);
  const [openPlay, closePlay] = useSound(openSound, closeSound);

  function handleOpen() {
    setOpen(true);
    if (openPlay) {
      openPlay();
    }
  }

  function handleClose(e: MouseEvent<HTMLButtonElement>) {
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
      >
        {children}
      </Modal>
    </>
  );
}

export default ModalComponent;

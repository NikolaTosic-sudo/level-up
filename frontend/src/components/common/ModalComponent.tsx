import { Button, Modal, type ButtonProps, type ModalProps } from "antd";
import { useState, type ReactElement } from "react";
import { useSound } from "../../hooks/useSound";
import openSound from "../../assets/popup.wav";
import closeSound from "../../assets/close.wav";

type ModalComponentProps = {
  buttonInner: ReactElement | string;
  buttonProps?: ButtonProps;
};

function ModalComponent({
  children,
  buttonInner,
  buttonProps,
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

  function handleClose() {
    setOpen(false);
    if (closePlay) {
      closePlay();
    }
  }

  return (
    <>
      <Button {...buttonProps} onClick={handleOpen}>
        {buttonInner}
      </Button>
      <Modal {...props} open={open} onCancel={handleClose}>
        {children}
      </Modal>
    </>
  );
}

export default ModalComponent;

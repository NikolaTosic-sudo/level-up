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
  isOpen?: boolean;
  setIsOpen?: (val: boolean) => void;
};

function ModalComponent({
  children,
  buttonInner,
  buttonProps,
  buttonTooltip,
  isOpen,
  setIsOpen,
  onCancel,
  title,
  noDivider,
  onOk,
  ...props
}: ModalComponentProps & ModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [openPlay, closePlay] = useSound(openSound, closeSound);

  const isControlled = isOpen !== undefined;
  const open = isControlled ? isOpen : internalOpen;

  function closeModal() {
    setInternalOpen(false);
    if (closePlay) {
      closePlay();
    }
    if (setIsOpen) {
      setIsOpen(false);
    }
  }

  function handleOpen(e: MouseEvent) {
    e.stopPropagation();
    setInternalOpen(true);
    if (setIsOpen) {
      setIsOpen(true);
    }
    if (openPlay) {
      openPlay();
    }
  }

  function handleClose(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    closeModal();
    if (setIsOpen) {
      setIsOpen(false);
    }
    if (onCancel) {
      onCancel(e);
    }
  }

  function handleFinish(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (onOk) {
      onOk(e);
    }
    if (!isControlled) closeModal();
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
        width={"100%"}
        {...props}
        open={open}
        onCancel={handleClose}
        onOk={handleFinish}
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

import { Popconfirm, type PopconfirmProps } from "antd";
import { useState, type MouseEvent } from "react";

function PopconfirmComponent(props: PopconfirmProps) {
  const [open, setOpen] = useState(false);

  function handleConfirm(e?: MouseEvent<HTMLElement>) {
    e?.stopPropagation();
    if (props.onConfirm) {
      props.onConfirm(e);
    }
    setOpen(false);
  }

  function handleCancel(e?: MouseEvent<HTMLElement>) {
    e?.stopPropagation();
    if (props.onCancel) {
      props.onCancel(e);
    }
    setOpen(false);
  }

  return (
    <Popconfirm
      cancelButtonProps={{ type: "primary", danger: true }}
      onOpenChange={(open) => setOpen(open)}
      open={open}
      {...props}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    >
      {props.children}
    </Popconfirm>
  );
}

export default PopconfirmComponent;

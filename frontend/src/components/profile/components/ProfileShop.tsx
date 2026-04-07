import { DollarCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState } from "react";

function ProfileShop() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="text" onClick={() => setOpen(true)}>
        <DollarCircleOutlined style={{ fontSize: 18 }} />
      </Button>

      <Modal
        cancelButtonProps={{ danger: true, type: "primary" }}
        onCancel={() => setOpen(false)}
        open={open}
      >
        <div>test</div>
      </Modal>
    </>
  );
}

export default ProfileShop;

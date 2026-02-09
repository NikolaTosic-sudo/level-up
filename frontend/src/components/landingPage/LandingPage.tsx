import { Button, Modal } from "antd";
import { useState } from "react";

function LandingPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open me now!
      </Button>
      <Modal
        cancelButtonProps={{ danger: true, type: "primary" }}
        onCancel={() => setOpen(false)}
        open={open}
      >
        Test Modal
      </Modal>
    </>
  );
}

export default LandingPage;

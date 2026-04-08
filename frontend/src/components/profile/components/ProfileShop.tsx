import { DollarCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Modal, Tooltip, Typography } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function ProfileShop() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip
        title={t("profile.header.shop.tooltip", { defaultValue: "Shop" })}
      >
        <Button type="text" onClick={() => setOpen(true)}>
          <DollarCircleOutlined style={{ fontSize: 18 }} />
        </Button>
      </Tooltip>

      <Modal
        cancelButtonProps={{ danger: true, type: "primary" }}
        onCancel={() => setOpen(false)}
        open={open}
        closable={false}
        title={
          <>
            <Flex justify="space-between" align="center">
              <Typography.Title level={4}>
                {t("profile.header.shop.title", { defaultValue: "Shop" })}
              </Typography.Title>

              <div>
                <DollarCircleOutlined
                  style={{ fontSize: 16, marginRight: 6 }}
                />
                800
              </div>
            </Flex>
            <Divider />
          </>
        }
      >
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
      </Modal>
    </>
  );
}

export default ProfileShop;

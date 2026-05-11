import { DollarCircleOutlined } from "@ant-design/icons";
import { Flex, Result, Spin, Typography } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ModalComponent from "../../common/ModalComponent";

function ProfileShop() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <ModalComponent
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
              <DollarCircleOutlined style={{ fontSize: 16, marginRight: 6 }} />
              800
            </div>
          </Flex>
        </>
      }
      buttonInner={<DollarCircleOutlined style={{ fontSize: 18 }} />}
      buttonProps={{
        type: "text",
      }}
      buttonTooltip={t("profile.header.shop.tooltip", { defaultValue: "Shop" })}
    >
      <Result
        icon={<Spin size="large" />}
        title={t("profile.header.shot.comingSoon", {
          defaultValue: "Coming soon...",
        })}
      />
    </ModalComponent>
  );
}

export default ProfileShop;

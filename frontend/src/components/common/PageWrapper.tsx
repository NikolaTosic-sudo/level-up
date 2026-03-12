import { Suspense } from "react";
import { ConfigProvider, Spin, type ThemeConfig } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Outlet } from "@tanstack/react-router";

import "../../../i18n.ts";
import "./styles/style.css";

const theme: ThemeConfig = {
  token: {
    borderRadius: 0,
    colorBorder: "rgba(0, 255, 255, 0.55)",
    fontFamily: "Montserrat, sans-serif",
    colorText: "white",
    colorError: "#9B0A3C",
    colorPrimary: "#008c95",
    colorTextPlaceholder: "#008c95",
    colorTextDescription: "rgba(255, 255, 255, 0.45)",
    colorTextQuaternary: "rgba(255, 255, 255, 0.45)",
    colorTextTertiary: "rgba(255, 255, 255, 0.65)",
  },
};

function PageWrapper() {
  return (
    <Suspense
      fallback={<Spin indicator={<LoadingOutlined spin />} size={"large"} />}
    >
      <ConfigProvider theme={theme}>
        <div className="page">
          <Outlet />
        </div>
      </ConfigProvider>
    </Suspense>
  );
}

export default PageWrapper;

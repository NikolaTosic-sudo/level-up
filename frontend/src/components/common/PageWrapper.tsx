import { Suspense } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Outlet } from "@tanstack/react-router";

import "../../../i18n.ts";

function PageWrapper() {
	return (
		<Suspense
			fallback={<Spin indicator={<LoadingOutlined spin />} size={"large"} />}
		>
			<div className="page">
				<Outlet />
			</div>
		</Suspense>
	);
}

export default PageWrapper;

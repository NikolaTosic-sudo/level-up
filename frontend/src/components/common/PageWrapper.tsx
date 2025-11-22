import { Outlet } from "@tanstack/react-router";

import '../../../i18n.ts'

function PageWrapper() {
	return (
		<Outlet />
	);
}

export default PageWrapper;

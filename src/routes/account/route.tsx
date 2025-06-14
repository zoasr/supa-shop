import { createFileRoute, Outlet } from "@tanstack/react-router";

import Breadcrumbs from "@/components/breadcrumbs";

const Layout = () => {
	return (
		<div className="container py-10 mx-auto">
			<Breadcrumbs />
			<Outlet />
		</div>
	);
};

export const Route = createFileRoute("/account")({
	component: Layout,
});

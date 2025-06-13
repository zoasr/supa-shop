import Breadcrumbs from "@/components/breadcrumbs";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products")({
	component: () => (
		<>
			<div className="container px-8 mx-auto">
				<Breadcrumbs />
			</div>
			<div className="container mx-auto">
				<Outlet />
			</div>
		</>
	),
});

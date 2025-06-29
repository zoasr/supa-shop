import { createFileRoute, Outlet } from '@tanstack/react-router';

import Breadcrumbs from '@/components/breadcrumbs';

const Layout = () => {
	return (
		<div className="container mx-auto py-10">
			<Breadcrumbs />
			<Outlet />
		</div>
	);
};

export const Route = createFileRoute('/account')({
	component: Layout
});

import { createFileRoute, Outlet } from '@tanstack/react-router';
import Breadcrumbs from '@/components/breadcrumbs';

export const Route = createFileRoute('/products')({
	component: () => (
		<>
			<div className="container mx-auto px-8">
				<Breadcrumbs />
			</div>
			<div className="container mx-auto">
				<Outlet />
			</div>
		</>
	)
});

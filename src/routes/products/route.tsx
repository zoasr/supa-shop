import Breadcrumbs from '@/components/breadcrumbs';
import { Outlet, createFileRoute } from '@tanstack/react-router';

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

import { createFileRoute } from '@tanstack/react-router';

import SkeletonCard from '@/components/skeleton-card';

export const Route = createFileRoute('/test')({
	component: RouteComponent
});

function RouteComponent() {
	return (
		<>
			<SkeletonCard></SkeletonCard>
		</>
	);
}

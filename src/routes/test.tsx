import { createFileRoute } from '@tanstack/react-router';

import SkeletonCard from '@/components/skeleton-card';
import { supabase } from '@/utils/supabase';

export const Route = createFileRoute('/test')({
	loader: async () => await supabase.rpc('get_distinct_categories'),
	component: RouteComponent
});

function RouteComponent() {
	const { data } = Route.useLoaderData();
	return (
		<>
			<div>{JSON.stringify(data)}</div>
			<SkeletonCard></SkeletonCard>
		</>
	);
}

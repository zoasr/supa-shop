import { createFileRoute, redirect } from '@tanstack/react-router';
import { isLoggedIn } from '@/utils/supabase';

export const Route = createFileRoute('/account/reviews')({
	beforeLoad: async () => {
		const loggedIn = await isLoggedIn();
		if (!loggedIn) {
			throw redirect({
				to: '/login'
			});
		}
	},
	component: () => <div>Hello /account/reviews!</div>
});

import { isLoggedIn } from "@/utils/supabase";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/account/")({
	beforeLoad: async () => {
		const loggedIn = await isLoggedIn();
		if (!loggedIn || loggedIn instanceof Error) {
			throw redirect({
				to: "/login",
			});
		}
	},
	component: () => <div>Hello /account!</div>,
});

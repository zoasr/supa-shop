import { isLoggedIn } from "@/utils/supabase";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/account/cart")({
	beforeLoad: async () => {
		const loggedIn = await isLoggedIn();
		if (!loggedIn) {
			throw redirect({
				to: "/login",
			});
		}
	},
	component: () => <div>Hello /account/cart!</div>,
});

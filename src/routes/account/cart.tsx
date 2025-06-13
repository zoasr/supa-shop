import CartCard from "@/components/cart-card";
import { useCartStore } from "@/store/cart";
import { getCart, getProduct, isLoggedIn } from "@/utils/supabase";
import {
	createFileRoute,
	redirect,
	useLoaderData,
} from "@tanstack/react-router";

export const Route = createFileRoute("/account/cart")({
	beforeLoad: async () => {
		const loggedIn = await isLoggedIn();
		if (!loggedIn) {
			throw redirect({
				to: "/login",
			});
		}
	},
	loader: async () => {
		const refreshCart = useCartStore.getState().refreshCart;
		const cart = await getCart();
		const products = [];
		if (cart instanceof Array) {
			for (const item of cart) {
				const product = await getProduct(item.product_id);
				product ? products.push(product[0]) : null;
			}
		}
		await refreshCart();
		return products;
	},
	component: Page,
});

function Page() {
	const cart = useLoaderData({
		from: "/account/cart",
	});

	return (
		<>
			<div className="flex justify-between w-full">
				<h1 className="text-xl font-medium">
					Cart ({cart ? cart.length : 0})
				</h1>
			</div>
			<div className="container mx-auto grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 place-items-center">
				{cart &&
					cart.map((product) => (
						<CartCard key={product.id} {...product} />
					))}
			</div>
		</>
	);
}

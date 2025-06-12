import WishlistCard from "@/components/wishlist-card";
import { getProduct, getWishList, isLoggedIn } from "@/utils/supabase";
import {
	createFileRoute,
	redirect,
	useLoaderData,
} from "@tanstack/react-router";

export const Route = createFileRoute("/account/wishlist")({
	beforeLoad: async () => {
		const loggedIn = await isLoggedIn();
		if (!loggedIn) {
			throw redirect({
				to: "/login",
			});
		}
	},
	loader: async () => {
		const wishlist = await getWishList();
		const products = [];
		if (wishlist) {
			for (const item of wishlist) {
				const product = await getProduct(item.product_id);
				product ? products.push(product[0]) : null;
			}
		}
		return products;
	},
	component: Page,
});

function Page() {
	const wishList = useLoaderData({
		from: "/account/wishlist",
	});
	return (
		<>
			<div className="flex justify-between w-full">
				<h1 className="text-xl font-medium">
					Wishlist ({wishList ? wishList?.length : 0})
				</h1>
				<button className="px-8 py-4 font-bold rounded-lg border-2 border-skin-text-1">
					Move all to cart
				</button>
			</div>
			<div className="container mx-auto grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 place-items-center">
				{wishList &&
					wishList.map((product) => (
						<WishlistCard key={product.id} {...product} />
					))}
			</div>
		</>
	);
}

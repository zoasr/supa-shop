import { Input } from "$/components/ui/input";
import CartButtonComponent from "@/components/cart-button";
import { CartTotal } from "@/components/cart-total";
import { useCartStore } from "@/store/cart";
import { getCart, getProduct, isLoggedIn } from "@/utils/supabase";
import type { CartItem, Product } from "@/utils/utils";
import {
	createFileRoute,
	Link,
	redirect,
	useLoaderData,
} from "@tanstack/react-router";
import { Plus, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const Route = createFileRoute("/account/cart")({
	beforeLoad: async () => {
		const loggedIn = await isLoggedIn();
		if (!loggedIn || loggedIn instanceof Error) {
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
				product instanceof Error ? null : products.push(product);
			}
		}
		await refreshCart();
		return { products, cart };
	},
	component: Page,
});

const CartCardDetailed = ({ product }: { product: Product }) => {
	const modifyCart = useCartStore((state) => state.modifyCart);
	const cart = useCartStore((state) => state.cart);
	const quantity =
		cart?.find((item) => item.product_id === product.id)?.quantity || 1;

	const calculateSubtotal = (): number => {
		if (product.price && !product.discount) {
			return calculatePrice() * quantity;
		} else if (product.price && product.discount) {
			return calculatePrice() * quantity;
		}
		return 0;
	};
	const calculatePrice = (): number => {
		if (product.price && !product.discount) {
			return product.price;
		} else if (product.price && product.discount) {
			return product.price - product.price * (product.discount / 100);
		}
		return 0;
	};
	return (
		<>
			<div className="flex justify-between items-center w-full flex-col sm:flex-row gap-4 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] py-7 px-16 rounded-md font-bold text-center">
				<div className="flex flex-1 basis-1/4 gap-4 items-center justify-center sm:flex-row flex-col">
					<div className="size-auto relative group">
						<img
							className="size-full object-cover"
							src={product.imageUrl}
							alt={product.productName}
						/>
						<CartButtonComponent
							productId={product.id}
							quantity={quantity}
							className="absolute -top-2 -right-2 bg-skin-button size-6 aspect-square text-skin-text pointer-events-none opacity-0 transition-all
							hover:bg-skin-button-2 hover:text-skin-text
							group-hover:pointer-events-auto group-hover:opacity-100 "
						>
							{(isAdded) => (isAdded ? <X /> : <Plus />)}
						</CartButtonComponent>
					</div>
					<h2>{product.productName}</h2>
				</div>
				<p className="flex-1 basis-1/4 space-x-2">
					<span>${calculatePrice().toFixed(2)}</span>
					{product.discount && (
						<span className="line-through text-skin-button/50">
							${product.price}
						</span>
					)}
				</p>
				<span className="flex items-center justify-center flex-1 basis-1/4">
					<Input
						type="number"
						max={10}
						min={1}
						className="w-16"
						value={quantity}
						onChange={async (e) => {
							await modifyCart(
								product.id,
								Number(e.target.value)
							);
						}}
					/>
				</span>
				<p className="flex-1 basis-1/4 text-end">
					${calculateSubtotal().toFixed(2)}
				</p>
			</div>
		</>
	);
};

function Page() {
	const { cart, products } = useLoaderData({
		from: "/account/cart",
	});

	return (
		<>
			<div className="flex justify-between w-full my-8">
				<h1 className="text-xl font-medium">
					Cart ({cart instanceof Array ? cart.length : 0})
				</h1>
			</div>
			<div className="container mx-auto grid gap-4 place-items-center">
				<div className="justify-between items-center hidden sm:flex w-full bg-skin-secondary shadow-[0_0_10px_0_rgba(0,0,0,0.1)] py-7 px-16 rounded-md font-bold text-center">
					<div className="flex flex-1 basis-1/4 gap-4 items-center">
						<h2>Product Name</h2>
					</div>
					<p className="flex-1 basis-1/4">Price</p>
					<p className="flex-1 basis-1/4">Quantity</p>
					<p className="flex-1 basis-1/4 text-end">Subtotal</p>
				</div>
				{cart instanceof Array &&
					products instanceof Array &&
					products.map((product) =>
						product ? (
							<CartCardDetailed
								key={product.id}
								product={product}
							/>
						) : null
					)}
				<div className="flex w-full justify-between items-center">
					<Link
						to="/products"
						className="px-8 py-4 font-bold rounded-md border-2 border-black/50 disabled:opacity-50 flex items-center gap-2"
					>
						Return to Shop
					</Link>
				</div>
				{cart instanceof Array && cart.length > 0 && (
					<CartTotal products={products} cart={cart as CartItem[]} />
				)}
			</div>
		</>
	);
}

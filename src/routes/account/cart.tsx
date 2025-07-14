import { Button } from '$/components/ui/button';
import { Input } from '$/components/ui/input';
import { createFileRoute, Link, redirect, useLoaderData } from '@tanstack/react-router';
import { Plus, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CartButtonComponent from '@/components/cart-button';
import { CartTotal } from '@/components/cart-total';
import { useCart, useCartActions, usePlainCart } from '@/store/cart';
import { getCart, getProduct, isLoggedIn } from '@/utils/supabase';
import type { CartItem, Product } from '@/utils/utils';

export const Route = createFileRoute('/account/cart')({
	beforeLoad: async () => {
		const loggedIn = await isLoggedIn();
		if (!loggedIn || loggedIn instanceof Error) {
			throw redirect({
				to: '/login'
			});
		}
	},
	loader: async () => {
		const { refreshCart } = usePlainCart().actions;
		const cart = await getCart();
		const products = [];
		if (Array.isArray(cart)) {
			for (const item of cart) {
				const product = await getProduct(item.product_id);
				product instanceof Error ? null : products.push(product);
			}
		}
		await refreshCart();
		return { products, cart };
	},
	component: Page
});

const CartCardDetailed = ({ product }: { product: Product }) => {
	const { modifyCart } = useCartActions();
	const cart = useCart();
	const quantity = cart?.find((item) => item.product_id === product.id)?.quantity || 1;

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
		<div className="flex w-full flex-col items-center justify-between gap-4 rounded-md bg-skin-secondary px-16 py-7 text-center font-bold shadow-[0_0_10px_0_rgba(0,0,0,0.1)] sm:flex-row dark:shadow-[0_0_10px_0_rgba(255,255,255,0.1)]">
			<div className="flex flex-col flex-1 gap-4 justify-center items-center basis-1/4 sm:flex-row">
				<div className="relative group size-auto">
					<img className="object-cover size-full" src={product.imageUrl} alt={product.productName} />
					<CartButtonComponent
						productId={product.id}
						quantity={quantity}
						className="absolute -top-2 -right-2 opacity-0 transition-all pointer-events-none aspect-square size-6 bg-skin-button text-skin-text group-hover:pointer-events-auto group-hover:opacity-100 hover:bg-skin-button-2 hover:text-skin-text"
					>
						{(isAdded) => (isAdded ? <X /> : <Plus />)}
					</CartButtonComponent>
				</div>
				<h2>{product.productName}</h2>
			</div>
			<p className="flex-1 space-x-2 basis-1/4">
				<span>${calculatePrice().toFixed(2)}</span>
				{product.discount && <span className="line-through text-skin-button/50">${product.price}</span>}
			</p>
			<span className="flex flex-1 justify-center items-center basis-1/4">
				<Input
					type="number"
					max={10}
					min={1}
					className="w-16"
					value={quantity}
					onChange={async (e) => {
						await modifyCart(product.id, Number(e.target.value));
					}}
				/>
			</span>
			<p className="flex-1 basis-1/4 text-end">${calculateSubtotal().toFixed(2)}</p>
		</div>
	);
};

function Page() {
	const { t } = useTranslation();
	const { cart, products } = useLoaderData({
		from: '/account/cart'
	});

	return (
		<>
			<div className="flex justify-between my-8 w-full">
				<h1 className="text-xl font-medium">
					{t('cart.title')} ({Array.isArray(cart) ? cart.length : 0})
				</h1>
			</div>
			<div className="container grid gap-4 place-items-center mx-auto">
				<div className="hidden w-full items-center justify-between rounded-md bg-skin-secondary px-16 py-7 text-center font-bold shadow-[0_0_10px_0_rgba(0,0,0,0.1)] sm:flex">
					<div className="flex flex-1 gap-4 items-center basis-1/4">
						<h2>{t('cart.productName')}</h2>
					</div>
					<p className="flex-1 basis-1/4">{t('cart.price')}</p>
					<p className="flex-1 basis-1/4">{t('cart.quantity')}</p>
					<p className="flex-1 basis-1/4 text-end">{t('cart.subtotal')}</p>
				</div>
				{Array.isArray(cart) &&
					Array.isArray(products) &&
					products.map((product) =>
						product ? <CartCardDetailed key={product.id} product={product} /> : null
					)}
				<div className="flex justify-between items-center w-full">
					<Link to="/products">
						<Button variant="outline">{t('cart.returnToShop')}</Button>
					</Link>
				</div>
				{Array.isArray(cart) && cart.length > 0 && <CartTotal products={products} cart={cart as CartItem[]} />}
			</div>
		</>
	);
}

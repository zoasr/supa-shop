import { Button } from '$/components/ui/button';
import { cn } from '$/lib/utils';
import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SmallHeart from '@/assets/heart small.svg?react';
import ReturnIcon from '@/assets/Icon-return.svg?react';
import DeliveryIcon from '@/assets/icon-delivery.svg?react';
import emptyStar from '@/assets/star-empty.svg';
import filledStar from '@/assets/star-filled.svg';
import CartButton from '@/components/cart-button';
import { WishlistButton } from '@/components/wishlist-button';
import { getCartItem, getProductBySlug } from '@/utils/supabase';
import type { CartItem, Product } from '@/utils/utils';

const getProductbyId: (id: string) => Promise<{
	product: Product | null | Error;
	cart: CartItem | null | Error;
}> = async (id: string) => {
	const product = await getProductBySlug(id);
	if (product instanceof Error) {
		return {
			product,
			cart: null
		};
	}
	if (!product) {
		return {
			product: null,
			cart: null
		};
	}
	const cart = await getCartItem(product.id);

	if (cart instanceof Error) {
		return {
			product,
			cart
		};
	}
	if (!cart) {
		return {
			product,
			cart: null
		};
	}

	return {
		product,
		cart
	};
};

const clamp = (num: number, min: number, max: number) => {
	return Math.min(Math.max(num, min), max);
};

const Productpage = () => {
	const { product, cart } = useLoaderData({
		from: '/products/$productId'
	});
	const [selected, setSelected] = useState<number>(0);
	const [items, setItems] = useState<number>(cart instanceof Error ? 1 : cart?.quantity || 1);
	const { t } = useTranslation();

	if (product instanceof Error) {
		return <div>{product.message}</div>;
	}
	if (cart instanceof Error) {
		return <div>{cart.message}</div>;
	}
	if (!product) {
		return <div>Product not found</div>;
	}

	return (
		<article className="container flex flex-col gap-8 justify-center items-center px-4 py-16 mx-auto md:flex-row">
			<div
				className="flex h-full min-h-[600px] w-[100%] max-w-[700px] min-w-[300px] items-center justify-center rounded-lg bg-skin-secondary p-10"
				style={{
					viewTransitionName: `product-${product.id}-picture`
				}}
			>
				<img src={product.imageUrl} alt="" className="size-full lg:size-1/2" />
			</div>
			<div className="flex flex-col gap-4 justify-center items-center sm:items-start">
				<h1 className="text-3xl font-semibold">{product.productName}</h1>
				<div className="flex flex-wrap gap-4 items-center">
					<div className="flex gap-1">
						{[...Array.from({ length: product.rating })].map((_, i) => (
							<img key={i} src={filledStar} alt="star" className="w-4 h-4" />
						))}
						{[...Array.from({ length: 5 - product.rating })].map((_, i) => (
							<img key={i} src={emptyStar} alt="empty star" className="w-4 h-4" />
						))}
					</div>
					<p>
						({product.reviews} {t('productIdPage.reviews')})
					</p>
					<span>|</span>
					<p className="text-skin-button-1">{t('productIdPage.inStock')}</p>
				</div>
				{product.price ? <h2 className="text-3xl">${product.price}</h2> : null}
				<p>{product.productDescription}</p>
				<hr className="w-full rounded-md bg-black/50" />
				<div className="flex gap-2 items-center">
					Colors:{' '}
					{product.colors?.map((color: string, i: number) => (
						<button
							onClick={() => setSelected(i)}
							key={color}
							className={cn('size-4 rounded-full', {
								'ring-2 ring-skin-primary-1': selected === i
							})}
							style={{ backgroundColor: color }}
						></button>
					))}
				</div>
				<div className="flex flex-col items-center justify-center gap-4 sm:h-[50px] sm:flex-row">
					<div className="divide-primary-1 border-primary-1 flex h-12 w-[200px] justify-center gap-0 divide-x-2 overflow-clip rounded-lg border-2 text-center text-3xl">
						<button
							className="w-1/2 h-full font-medium transition-all duration-150 text-skin-secondary-2 hover:bg-skin-secondary-2 hover:text-skin-text"
							onClick={() => setItems(clamp(items - 1, 1, 10))}
						>
							-
						</button>
						<p className="flex justify-center items-center w-1/2 h-full">{items}</p>
						<button
							className="w-1/2 h-full font-medium transition-all duration-150 text-skin-secondary-2 hover:bg-skin-secondary-2 hover:text-skin-text"
							onClick={() => setItems(clamp(items + 1, 1, 10))}
						>
							+
						</button>
					</div>
					<Button asChild className="p-0 transition-all w-fit">
						<CartButton
							productId={product.id}
							quantity={items}
							className="h-12 w-[200px] bg-skin-secondary-2 py-8 text-white outline-0 transition-all duration-150 hover:bg-skin-button-hover hover:text-white focus:outline-0 focus-visible:outline-0 data-[state=on]:w-[300px]"
						>
							{(isAdded) =>
								isAdded ? t('productIdPage.removeFromCartButton') : t('productIdPage.buyNowButton')
							}
						</CartButton>
					</Button>
					<WishlistButton
						productId={product.id}
						className="group h-full cursor-pointer rounded-sm px-4 py-4 font-medium border-2 border-border  transition-all duration-150 hover:bg-skin-button-hover focus:outline-skin-secondary-2 focus-visible:bg-skin-secondary-2 data-[state=on]:border-primary data-[state=on]:bg-skin-secondary-2 sm:py-0"
					>
						<SmallHeart className="size-6 group-hover:text-white group-focus-visible:text-white group-data-[state=on]:text-white" />
					</WishlistButton>
				</div>
				<div className="w-full rounded-lg border-2 divide-y-2 divide-primary-1 border-primary-1">
					<div className="flex gap-4 justify-start p-8">
						<DeliveryIcon />

						<div>
							<h1 className="text-xl font-bold">{t('productIdPage.freeDelivery.title')}</h1>
							<p>{t('productIdPage.freeDelivery.description')}</p>
						</div>
					</div>
					<div className="flex gap-4 justify-start p-8">
						<ReturnIcon />
						<div>
							<h1 className="text-xl font-bold">{t('productIdPage.returnDelivery.title')}</h1>
							<p>{t('productIdPage.returnDelivery.description')}</p>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
};

export const Route = createFileRoute('/products/$productId')({
	loader: ({ params: { productId } }) => getProductbyId(productId),
	component: Productpage
});

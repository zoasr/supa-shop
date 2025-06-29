import ErrorComponent from '@/components/error-component';
import ProductCard from '@/components/product-card';
import SectionLabel from '@/components/sections/section-label';
import WishlistCard from '@/components/wishlist-card';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { getProduct, getProducts, getWishList, isLoggedIn } from '@/utils/supabase';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link, redirect, useLoaderData, useRouter } from '@tanstack/react-router';
import { Loader } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { toast } from 'sonner';
import { Button } from '$/components/ui/button';

export const Route = createFileRoute('/account/wishlist')({
	beforeLoad: async () => {
		const loggedIn = await isLoggedIn();
		if (!loggedIn || loggedIn instanceof Error) {
			throw redirect({
				to: '/login'
			});
		}
	},
	loader: async () => {
		const refreshWishlist = useWishlistStore.getState().refreshWishlist;
		const wishlist = await getWishList();
		const products = [];
		if (wishlist instanceof Array) {
			for (const item of wishlist) {
				const product = await getProduct(item.product_id);
				product instanceof Error ? null : products.push(product);
			}
		}
		await refreshWishlist();
		return products;
	},
	component: Page
});

function Page() {
	const wishList = useLoaderData({
		from: '/account/wishlist'
	});
	const {
		data: products,
		isError,
		isPending,
		error
	} = useQuery({ queryKey: ['products'], queryFn: () => getProducts(5) });
	const { t } = useTranslation();
	const removeFromWishList = useWishlistStore((state) => state.removeFromWishList);
	const addToCart = useCartStore((state) => state.addToCart);
	const modifyCart = useCartStore((state) => state.modifyCart);
	const cart = useCartStore((state) => state.cart);
	const router = useRouter();
	const [isMovingAll, setIsMovingAll] = React.useState(false);

	const handleMoveAllToBag = async () => {
		try {
			setIsMovingAll(true);
			if (!Array.isArray(wishList) || !Array.isArray(cart)) {
				throw new Error('Failed to process wishlist');
			}

			// Process each item sequentially to avoid race conditions
			for (const product of wishList) {
				if (!product) continue;

				try {
					const existingProduct = cart.find((item) => item.product_id === product.id);

					if (existingProduct) {
						// If product exists in cart, increment quantity
						modifyCart(product.id, existingProduct.quantity + 1);
						toast.success(
							t('common.productAdded', {
								productName: product.productName
							})
						);
					} else {
						// Otherwise, add new item to cart
						await addToCart(product.id, 1);
					}

					// Only remove from wishlist if cart operation was successful
					removeFromWishList(product.id);
				} catch (error) {
					toast.error(
						t('common.productError', {
							productName: product.productName
						})
					);
					console.error(`Failed to move product ${product.id}:`, error);
				}
			}

			// Refresh data after all operations
			await router.invalidate();
		} catch (error) {
			console.error('Error moving items to cart:', error);
		} finally {
			setIsMovingAll(false);
		}
	};

	return (
		<>
			<div className="mb-16 flex w-full justify-between">
				<h1 className="text-xl font-medium">
					{t('wishlist.title')} ({wishList ? wishList?.length : 0})
				</h1>
				<Button variant="outline" disabled={isMovingAll} onClick={handleMoveAllToBag}>
					{isMovingAll ? (
						<>
							<Loader className="h-4 w-4 animate-spin" />
							{t('common.processing')}
						</>
					) : (
						t('wishlist.moveAllToBag')
					)}
				</Button>
			</div>
			<div className="container mx-auto grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] place-items-center gap-4">
				{wishList &&
					wishList.map((product) => (product ? <WishlistCard key={product.id} {...product} /> : null))}
			</div>
			<section dir={t('dir')}>
				<div className="container mx-auto my-8 space-y-8 border-y-2 border-skin-secondary py-8">
					<div className="flex items-center justify-between">
						<SectionLabel title={t('wishlist.justForYou')} />
						<Link
							to="/products"
							className="rounded-md border-2 border-black/50 px-8 py-4 font-bold"
							viewTransition={{
								types: ['slide-left']
							}}
						>
							{t('wishlist.seeAll')}
						</Link>
					</div>
					<div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
						<h1 className="text-3xl font-semibold">{t('wishlist.justForYou')}</h1>
					</div>
					<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] place-items-center gap-4">
						{isError && <ErrorComponent error={error} />}
						{isPending && <Loader className="size-20 animate-spin" />}
						{products instanceof Array &&
							!isError &&
							!isPending &&
							products.map((product) => <ProductCard key={product.id} {...product} />)}
					</div>
				</div>
			</section>
		</>
	);
}

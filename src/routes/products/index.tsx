import ProductCard from '@/components/product-card';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { getProducts } from '@/utils/supabase';
import type { Product } from '@/utils/utils';
import { createFileRoute, useLoaderData } from '@tanstack/react-router';

const Products = () => {
	const loaderData: Product[] | null = useLoaderData({ from: '/products/' });
	return (
		<>
			<div className="container mx-auto grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] place-items-center gap-4">
				{loaderData && loaderData.map((product) => <ProductCard key={product.id} {...product} />)}
			</div>
		</>
	);
};

export const Route = createFileRoute('/products/')({
	loader: async () => {
		const refreshCart = useCartStore.getState().refreshCart;
		const refreshWishlist = useWishlistStore.getState().refreshWishlist;
		const products = await getProducts();
		await refreshCart();
		await refreshWishlist();
		return products;
	},
	component: Products
});

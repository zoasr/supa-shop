import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import ProductCard from '@/components/product-card';
import { usePlainCart } from '@/store/cart';
import { usePlainWishlist } from '@/store/wishlist';
import { getProducts } from '@/utils/supabase';
import type { Product } from '@/utils/utils';

const Products = () => {
	const loaderData: Product[] | null = useLoaderData({ from: '/products/' });
	return (
		<div className="container mx-auto grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] place-items-center gap-4">
			{loaderData?.map((product) => (
				<ProductCard key={product.id} {...product} />
			))}
		</div>
	);
};

export const Route = createFileRoute('/products/')({
	loader: async () => {
		const { refreshCart } = usePlainCart().actions;
		const { refreshWishlist } = usePlainWishlist().actions;
		const products = await getProducts();
		await refreshCart();
		await refreshWishlist();
		return products;
	},
	component: Products
});

import { Button } from '$/components/ui/button';
import { createFileRoute, Link, useLoaderData } from '@tanstack/react-router';
import { z } from 'zod';
import ProductCard from '@/components/product-card';
import { usePlainCart } from '@/store/cart';
import { usePlainWishlist } from '@/store/wishlist';
import { getAllCategories, getProductsByCategory } from '@/utils/supabase';
import type { Product } from '@/utils/utils';

const Products = () => {
	const { categories, products } = useLoaderData({
		from: '/products/'
	});
	if (products instanceof Error || categories instanceof Error) return null;
	return (
		<>
			<ul className="flex overflow-auto gap-4 px-8 py-4 mb-8 w-full scrollable mask-[linear-gradient(90deg,transparent_1%,black_5%,black,black,black_95%,transparent)]">
				{categories?.map((c: string | null) => (
					<li key={c}>
						<Link
							to="/products"
							search={{ category: c ?? 'all' }}
							activeProps={{ className: '[&>button]:bg-skin-button [&>button]:text-skin-primary' }}
						>
							<Button className="p-2 text-sm">{c}</Button>
						</Link>
					</li>
				))}
			</ul>
			<div className="container mx-auto grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] place-items-center gap-4">
				{products?.map((product: Product) => (
					<ProductCard key={product.id} {...product} />
				))}
			</div>
		</>
	);
};

const SearchSchema = z.object({
	category: z.string()
});

export const Route = createFileRoute('/products/')({
	validateSearch: (search) => SearchSchema.parse(search),
	loaderDeps: ({ search: { category } }) => ({ category }),
	loader: async ({ deps: { category } }) => {
		const { refreshCart } = usePlainCart().actions;
		const { refreshWishlist } = usePlainWishlist().actions;
		const categories = await getAllCategories();
		const products = await getProductsByCategory(category);
		await refreshCart();
		await refreshWishlist();
		return { categories, products };
	},
	component: Products
});

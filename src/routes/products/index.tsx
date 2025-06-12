import ProductCard from "@/components/product-card";
import { getProducts } from "@/utils/supabase";
import type { Product } from "@/utils/utils";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

const Products = () => {
	const loaderData: Product[] | null = useLoaderData({ from: "/products/" });
	return (
		<>
			<div className="container mx-auto grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 place-items-center">
				{loaderData &&
					loaderData.map((product) => (
						<ProductCard key={product.id} {...product} />
					))}
			</div>
		</>
	);
};

export const Route = createFileRoute("/products/")({
	loader: getProducts,
	component: Products,
});

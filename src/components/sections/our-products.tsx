import SectionLabel from "./section-label";

import type { Product } from "@/utils/utils";
import { useTranslation } from "react-i18next";
import ProductCard from "../product-card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";
import ErrorComponent from "../error-component";
import { Loader } from "lucide-react";
import { Link } from "@tanstack/react-router";

const getProducts = async () => {
	const response = (await supabase.from("products").select("*").limit(6)) as {
		data: Product[] | null;
	};
	return response.data;
};
const OurProducts = () => {
	const {
		data: products,
		isError,
		isPending,
		error,
	} = useQuery({ queryKey: ["products"], queryFn: getProducts });
	const { t } = useTranslation();

	return (
		<>
			<section dir={t("dir")}>
				<div className="container mx-auto py-8 my-8 space-y-8 border-y-2 border-skin-secondary">
					<SectionLabel title={t("products.label")} />
					<div className="flex flex-col gap-4 justify-between items-center w-full md:flex-row">
						<h1 className="text-3xl font-semibold">
							{t("products.title")}
						</h1>
					</div>
					<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 place-items-center">
						{isError && <ErrorComponent error={error} />}
						{isPending && (
							<Loader className="animate-spin size-20" />
						)}
						{products &&
							!isError &&
							!isPending &&
							products.map((product) => (
								<ProductCard key={product.id} {...product} />
							))}
					</div>
					<div className="text-center">
						<Link
							to="/products"
							className="px-8 py-4 font-medium rounded-lg bg-skin-secondary-2 text-skin-text"
							viewTransition={{
								types: ["slide-left"],
							}}
						>
							{t("products.button")}
						</Link>
					</div>
				</div>
			</section>
		</>
	);
};

export default OurProducts;

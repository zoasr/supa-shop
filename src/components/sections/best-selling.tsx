import { useRef } from "react";
import { useTranslation } from "react-i18next";

import SectionLabel from "./section-label";
import ProductCard from "../product-card";

import arrowLeft from "@/assets/icons_arrow-left.svg";
import arrowRight from "@/assets/icons_arrow-right.svg";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";
import type { Product } from "@/utils/utils";
import ErrorComponent from "../error-component";
import { Loader } from "lucide-react";
import { Link } from "@tanstack/react-router";
import SkeletonCard from "../skeleton-card";

const getProducts = async () => {
	const response = (await supabase
		.from("products")
		.select("*")
		.lt("price", 200)) as { data: Product[] | null };

	return response.data;
};
const BestSelling = () => {
	const carouselRef = useRef<HTMLDivElement>(null);
	const { t } = useTranslation();

	const {
		data: products,
		isError,
		isPending,
		error,
	} = useQuery({
		queryKey: ["products"],
		queryFn: getProducts,
	});

	return (
		<>
			<section
				className="my-10 border-b-2 border-solid border-skin-secondary"
				dir={t("dir")}
			>
				<div className="container mx-auto">
					<SectionLabel title={t("best-selling.label")} />
					<div className="flex flex-col gap-4 justify-between items-center w-full md:flex-row">
						<h1 className="text-5xl font-medium">
							{t("best-selling.title")}
						</h1>
						<div className="flex gap-2" dir={"ltr"}>
							<button
								className="p-4 rounded-full bg-skin-secondary"
								onClick={() => {
									carouselRef.current?.scrollBy({
										left: -200,
										behavior: "smooth",
									});
								}}
							>
								<img src={arrowLeft} alt="" />
							</button>
							<button
								className="p-4 rounded-full bg-skin-secondary"
								onClick={() => {
									carouselRef.current?.scrollBy({
										left: 200,
										behavior: "smooth",
									});
								}}
							>
								<img src={arrowRight} alt="" />
							</button>
						</div>
						<div className="text-center">
							<Link
								to="/products"
								className="px-8 py-4 font-medium rounded-lg bg-skin-secondary-2 text-skin-text"
							>
								{t("best-selling.button")}
							</Link>
						</div>
					</div>
					<div
						ref={carouselRef}
						className="flex overflow-x-auto gap-4 py-4 my-4"
					>
						{isPending &&
							// <Loader className="animate-spin size-20" />
							Array.from({ length: 4 }).map((_, i) => {
								return <SkeletonCard key={i} />;
							})}
						{isError && <ErrorComponent error={error} />}
						{!isError &&
							!isPending &&
							products &&
							products.map((product) => (
								<ProductCard key={product.id} {...product} />
							))}
					</div>
				</div>
			</section>
		</>
	);
};

export default BestSelling;

import { supabase } from "@/utils/supabase";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

import smallHeart from "@/assets/heart small.svg";

import filledStar from "@/assets/star-filled.svg";
import emptyStar from "@/assets/star-empty.svg";
import deliveryIcon from "@/assets/icon-delivery.svg";
import returnIcon from "@/assets/Icon-return.svg";
import { useState } from "react";
import { cn } from "$/lib/utils";
import type { Product } from "@/utils/utils";
import { WishlistButton } from "@/components/wishlist-button";

const getProductbyId: (id: string) => Promise<Product> = async (id: string) => {
	const response = await supabase
		.from("products")
		.select("*")
		.eq("product", id)
		.single();

	return response.data;
};

const clamp = (num: number, min: number, max: number) => {
	return Math.min(Math.max(num, min), max);
};

const Productpage = () => {
	const [selected, setSelected] = useState<number>(0);
	const [items, setItems] = useState<number>(1);

	const product = useLoaderData({
		from: "/products/$productId",
	});
	return (
		<>
			<article className="container flex flex-col gap-8 justify-center items-center px-4 py-16 mx-auto md:flex-row">
				<div
					className="min-w-[300px] w-[100%] max-w-[700px] min-h-[600px] h-full p-10 bg-skin-secondary flex items-center justify-center rounded-lg"
					style={{
						viewTimelineName: `product-picture`,
					}}
				>
					<img
						src={product.imageUrl}
						alt=""
						className="lg:size-1/2 size-full "
					/>
				</div>
				<div className="flex flex-col gap-4 justify-center items-center sm:items-start">
					<h1 className="text-3xl font-semibold">
						{product.productName}
					</h1>
					<div className="flex flex-wrap gap-4 items-center">
						<div className="flex gap-1">
							{[...Array(product.rating)].map((_, i) => (
								<img
									key={i}
									src={filledStar}
									alt="star"
									className="w-4 h-4"
								/>
							))}
							{[...Array(5 - product.rating)].map((_, i) => (
								<img
									key={i}
									src={emptyStar}
									alt="empty star"
									className="w-4 h-4"
								/>
							))}
						</div>
						<p>({product.reviews} Reviews)</p>
						<span>|</span>
						<p className="text-skin-button-1">In Stock</p>
					</div>
					{product.price ? (
						<h2 className="text-3xl">${product.price}</h2>
					) : null}
					<p>{product.productDescription}</p>
					<hr className="w-full rounded-md bg-black/50" />
					<div className="flex gap-2 items-center">
						Colors:{" "}
						{product.colors?.map((color: string, i: number) => (
							<button
								onClick={() => setSelected(i)}
								key={color}
								className={cn("rounded-full size-4", {
									"ring-2 ring-black": selected === i,
								})}
								style={{ backgroundColor: color }}
							></button>
						))}
					</div>
					<div className="flex flex-col gap-4 justify-center items-center sm:flex-row sm:h-[50px]">
						<div className="flex gap-0 h-full justify-center w-[200px] text-3xl text-center overflow-clip rounded-lg border-2 divide-x-2 divide-black/30 border-black/30">
							<button
								className="w-1/2 h-full font-medium transition-all duration-150 text-skin-secondary-2 hover:bg-skin-secondary-2 hover:text-skin-text"
								onClick={() =>
									setItems(clamp(items - 1, 1, 10))
								}
							>
								-
							</button>
							<p className="flex justify-center items-center w-1/2 h-full">
								{items}
							</p>
							<button
								className="w-1/2 h-full font-medium  transition-all duration-150 text-skin-secondary-2 hover:bg-skin-secondary-2 hover:text-skin-text"
								onClick={() =>
									setItems(clamp(items + 1, 1, 10))
								}
							>
								+
							</button>
						</div>
						<button className="px-8 py-4 h-full text-nowrap font-medium rounded-lg sm:py-0 bg-skin-secondary-2 text-skin-text">
							Buy now
						</button>
						<WishlistButton
							productId={product.id}
							className="cursor-pointer px-4 py-4 h-full font-medium rounded-lg ring-2 transition-all duration-150 sm:py-0 group data-[state=on]:bg-skin-secondary-2 hover:bg-skin-button-hover focus:outline-skin-secondary-2 ring-black/30"
						>
							<img
								src={smallHeart}
								className="group-hover:invert group-focus-visible:invert group-data-[state=on]:invert"
								alt=""
							/>
						</WishlistButton>
					</div>
					<div className="w-full rounded-lg border-2 divide-y-2 border-black/30 divide-black/30">
						<div className="flex gap-4 justify-start p-8">
							<img src={deliveryIcon} />
							<div>
								<h1 className="text-xl font-bold">
									Free Delivery
								</h1>
								<p>
									Enter your postal code to get free delivery
								</p>
							</div>
						</div>
						<div className="flex gap-4 justify-start p-8">
							<img src={returnIcon} />
							<div>
								<h1 className="text-xl font-bold">
									Return Delivery
								</h1>
								<p>Free 30 days return policy</p>
							</div>
						</div>
					</div>
				</div>
			</article>
		</>
	);
};

export const Route = createFileRoute("/products/$productId")({
	loader: ({ params: { productId } }) => getProductbyId(productId),
	component: Productpage,
});

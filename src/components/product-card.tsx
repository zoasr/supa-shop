import filledStar from "@/assets/star-filled.svg";
import emptyStar from "@/assets/star-empty.svg";

import eyeIcon from "@/assets/fill-eye.svg";
import heartIcon from "@/assets/fill-heart.svg";
import type { Product } from "@/utils/utils";
import { cn } from "$/lib/utils";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { addToWishList } from "@/utils/supabase";
import { useRouter } from "@tanstack/react-router";
const ProductCard = ({
	id,
	product,
	imageUrl,
	productName,
	price,
	rating,
	reviews,
	discount,
	colors,
}: Product) => {
	const [selected, setSelected] = useState(0);
	const router = useRouter();

	return (
		<>
			<div className="min-w-[300px] w-[300px] group/card">
				<div className="relative overflow-clip rounded-lg">
					{discount && (
						<span className="absolute top-3 left-3 px-4 py-1 text-sm font-light rounded-md bg-skin-secondary-2 text-skin-text">
							-{discount}%
						</span>
					)}
					<div className="max-[270px] h-[250px] bg-skin-secondary flex items-center justify-center">
						<img
							className="object-cover w-full rounded-lg max-w-[140px]"
							src={imageUrl}
							alt={productName}
						/>
					</div>
					<div className="flex absolute top-0 right-0 flex-col gap-2 p-3">
						<button
							title="Watch"
							className={cn(
								"p-2 rounded-full duration-150 group"
							)}
						>
							<img
								src={eyeIcon}
								alt=""
								className="transition-all group-hover:invert group-focus-visible:invert"
							/>
						</button>
						<button
							title="Wishlist"
							onClick={() => {
								router.invalidate();
								addToWishList(id);
							}}
							className={cn(
								"p-2 rounded-full duration-150 group"
							)}
						>
							<img
								className="transition-all group-hover:invert group-focus-visible:invert"
								src={heartIcon}
								alt=""
							/>
						</button>
					</div>
					<span className="absolute bottom-0 left-0 py-2 w-full text-center transition-all translate-y-full cursor-pointer group-hover/card:translate-y-0 bg-skin-button text-skin-text">
						Add to Cart
					</span>
				</div>
				<Link to={`/products/${product}`}>
					<h2 className="text-lg font-medium">{productName}</h2>
					<p className="font-medium text-skin-secondary-2">
						{price ? (
							discount ? (
								<>
									<span className="mr-3">
										$
										{(
											price -
											(price * discount) / 100
										).toFixed(2)}
									</span>
									<span className="line-through text-skin-button/50">
										${price}
									</span>
								</>
							) : (
								<span>${price}</span>
							)
						) : null}
						{}
					</p>
					<div className="flex gap-2 justify-start items-center">
						<div className="flex gap-1">
							{[...Array(rating)].map((_, i) => (
								<img
									key={i}
									src={filledStar}
									alt="star"
									className="w-4 h-4"
								/>
							))}
							{[...Array(5 - rating)].map((_, i) => (
								<img
									key={i}
									src={emptyStar}
									alt="empty star"
									className="w-4 h-4"
								/>
							))}
						</div>
						{reviews && (
							<span className="text-skin-text-2">
								({reviews})
							</span>
						)}
					</div>
					<div className="flex gap-2">
						{colors?.map((color, i) => (
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
				</Link>
			</div>
		</>
	);
};

export default ProductCard;

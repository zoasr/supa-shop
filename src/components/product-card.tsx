import filledStar from "@/assets/star-filled.svg";
import emptyStar from "@/assets/star-empty.svg";

import eyeIcon from "@/assets/fill-eye.svg";
import heartIcon from "@/assets/fill-heart.svg";
import type { Product } from "@/utils/utils";
import { cn } from "$/lib/utils";
import { memo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { WishlistButton } from "./wishlist-button";
import CartButton from "./cart-button";
const ProductCard = memo(
	({
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

		return (
			<>
				<div className="min-w-[300px] w-[300px] group/card">
					<div className="relative overflow-clip rounded-lg">
						{discount && (
							<span className="absolute top-3 left-3 px-4 py-1 text-sm font-light rounded-md bg-skin-secondary-2 text-skin-text">
								-{discount}%
							</span>
						)}
						<div
							className="max-[270px] h-[250px] bg-skin-secondary flex items-center justify-center"
							style={{
								viewTransitionName: `product-picture}`,
							}}
						>
							<img
								className="object-cover w-full rounded-lg max-w-[140px] "
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
									alt="Eye icon"
									className="transition-all  group-focus-visible:invert group-hover:invert-25 "
								/>
							</button>
							<WishlistButton
								productId={id}
								className={cn(
									"p-2 rounded-full duration-150 group",
									""
								)}
								title="Wishlist"
							>
								<img
									src={heartIcon}
									className="transition-all group-data-[state=on]:invert group-hover:invert-25 group-focus-visible:invert"
									alt="Wishlist icon"
								/>
							</WishlistButton>
						</div>
						<CartButton
							productId={id}
							className={cn(
								"absolute bottom-0 left-0 py-2 w-full text-center transition-all translate-y-full cursor-pointer group-hover/card:translate-y-0 hover:bg-skin-primary-1 bg-skin-button text-skin-text hover:text-skin-text",
								""
							)}
						>
							{(isAdded) =>
								isAdded ? (
									<span>Remove from Cart</span>
								) : (
									<span>Add to Cart</span>
								)
							}
						</CartButton>
					</div>
					<Link
						to="/products/$productId"
						params={{ productId: product.toString() }}
						viewTransition={{
							types: ["scale-up"],
						}}
					>
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
	}
);

export default ProductCard;

import deleteIcon from "@/assets/icon-delete.svg";
import type { Product } from "@/utils/utils";
import { cn } from "$/lib/utils";
import { Link, useRouter } from "@tanstack/react-router";
import { removeFromCart } from "@/utils/supabase";
import { useCartStore } from "@/store/cart";
const CartCard = ({
	id,
	product,
	imageUrl,
	productName,
	price,
	discount,
	quantity = 1,
}: Product & { quantity: number }) => {
	const router = useRouter();
	const count = useCartStore((state) => state.count);
	const setCount = useCartStore((state) => state.setCount);
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
						{quantity > 1 && (
							<span className="absolute bottom-3 right-3 px-4 py-1 text-sm font-light rounded-md bg-skin-secondary-2 text-skin-text">
								{quantity}
							</span>
						)}
					</div>
					<div className="flex absolute top-0 right-0 flex-col gap-2 p-3">
						<button
							title="Watch"
							className={cn(
								"p-2 rounded-full duration-150 group",
								"hover:bg-skin-secondary-2"
							)}
							onClick={() => {
								router.invalidate();
								removeFromCart(id);
								if (count > 0) {
									setCount(count - 1);
								}
							}}
						>
							<img
								src={deleteIcon}
								alt=""
								className="transition-all group-hover:invert group-focus-visible:invert"
							/>
						</button>
					</div>
				</div>
				<Link
					to="/products/$productId"
					params={{ productId: product.toString() }}
				>
					<h2 className="text-lg font-medium">{productName}</h2>
					<p className="font-medium text-skin-secondary-2">
						{price ? (
							discount ? (
								<>
									<span className="mr-3">
										$
										{(
											(price - (price * discount) / 100) *
											quantity
										).toFixed(2)}
									</span>
									<span className="line-through text-skin-button/50">
										${(price * quantity).toFixed(2)}
									</span>
								</>
							) : (
								<span>${price}</span>
							)
						) : null}
					</p>
				</Link>
			</div>
		</>
	);
};

export default CartCard;

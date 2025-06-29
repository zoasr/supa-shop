import deleteIcon from '@/assets/icon-delete.svg';
import type { Product } from '@/utils/utils';
import { cn } from '$/lib/utils';
import { Link, useRouter } from '@tanstack/react-router';
import { removeFromCart } from '@/utils/supabase';
import { useCartStore } from '@/store/cart';
const CartCard = ({
	id,
	product,
	imageUrl,
	productName,
	price,
	discount,
	quantity = 1
}: Product & { quantity: number }) => {
	const router = useRouter();
	const count = useCartStore((state) => state.count);
	const setCount = useCartStore((state) => state.setCount);
	return (
		<>
			<div className="group/card w-[300px] min-w-[300px]">
				<div className="relative overflow-clip rounded-lg">
					{discount && (
						<span className="absolute top-3 left-3 rounded-md bg-skin-secondary-2 px-4 py-1 text-sm font-light text-skin-text">
							-{discount}%
						</span>
					)}
					<div className="max-[270px] flex h-[250px] items-center justify-center bg-skin-secondary">
						<img
							className="w-full max-w-[140px] rounded-lg object-cover"
							src={imageUrl}
							alt={productName}
						/>
						{quantity > 1 && (
							<span className="absolute right-3 bottom-3 rounded-md bg-skin-secondary-2 px-4 py-1 text-sm font-light text-skin-text">
								{quantity}
							</span>
						)}
					</div>
					<div className="absolute top-0 right-0 flex flex-col gap-2 p-3">
						<button
							title="Watch"
							className={cn('group rounded-full p-2 duration-150', 'hover:bg-skin-secondary-2')}
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
				<Link to="/products/$productId" params={{ productId: product.toString() }}>
					<h2 className="text-lg font-medium">{productName}</h2>
					<p className="font-medium text-skin-secondary-2">
						{price ? (
							discount ? (
								<>
									<span className="mr-3">
										${((price - (price * discount) / 100) * quantity).toFixed(2)}
									</span>
									<span className="text-skin-button/50 line-through">
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

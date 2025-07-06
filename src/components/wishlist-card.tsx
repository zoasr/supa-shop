import { cn } from '$/lib/utils';
import { Link, useRouter } from '@tanstack/react-router';
import DeleteIcon from '@/assets/icon-delete.svg?react';
import { useWishlistStore } from '@/store/wishlist';
import { removeFromWishList } from '@/utils/supabase';
import type { Product } from '@/utils/utils';
import CartButton from './cart-button';

const WishlistCard = ({ id, product, imageUrl, productName, price, discount }: Product) => {
	const router = useRouter();
	const count = useWishlistStore((state) => state.count);
	const setCount = useWishlistStore((state) => state.setCount);
	return (
		<div className="group/card w-[300px] min-w-[300px]">
			<div className="relative overflow-clip rounded-lg">
				{discount && (
					<span className="absolute top-3 left-3 rounded-sm bg-skin-secondary-2 px-4 py-1 text-sm font-light text-white">
						-{discount}%
					</span>
				)}
				<div
					className="max-[270px] flex h-[250px] items-center justify-center bg-skin-secondary"
					style={{
						viewTimelineName: `product-picture-${id}`
					}}
				>
					<img className="w-full max-w-[140px] rounded-lg object-cover" src={imageUrl} alt={productName} />
				</div>
				<div className="absolute top-0 right-0 flex flex-col gap-2 p-3">
					<button
						title="Watch"
						className={cn('group rounded-full p-2 duration-150', 'hover:bg-skin-secondary-2')}
						onClick={() => {
							router.invalidate();
							removeFromWishList(id);
							if (count > 0) {
								setCount(count - 1);
							}
						}}
					>
						<DeleteIcon />
					</button>
				</div>
				<CartButton
					productId={id}
					className={cn(
						'absolute bottom-0 left-0 w-full translate-y-full cursor-pointer bg-skin-button py-2 text-center text-skin-text transition-all group-hover/card:translate-y-0 hover:bg-skin-primary-1 hover:text-skin-text',
						''
					)}
				>
					{(isAdded) => (isAdded ? <span>Remove from Cart</span> : <span>Add to Cart</span>)}
				</CartButton>
			</div>
			<Link
				to="/products/$productId"
				params={{ productId: product.toString() }}
				viewTransition={{
					types: ['scale-up']
				}}
			>
				<h2 className="text-lg font-medium">{productName}</h2>
				<p className="font-medium text-skin-secondary-2">
					{price ? (
						discount ? (
							<>
								<span className="mr-3">${(price - (price * discount) / 100).toFixed(2)}</span>
								<span className="text-skin-button/50 line-through">${price}</span>
							</>
						) : (
							<span>${price}</span>
						)
					) : null}
					{}
				</p>
			</Link>
		</div>
	);
};

export default WishlistCard;

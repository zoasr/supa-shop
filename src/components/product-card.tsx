import { cn } from '$/lib/utils';
import { Link } from '@tanstack/react-router';
import { memo, useState } from 'react';
import eyeIcon from '@/assets/fill-eye.svg';
import heartIcon from '@/assets/fill-heart.svg';
import emptyStar from '@/assets/star-empty.svg';
import filledStar from '@/assets/star-filled.svg';
import type { Product } from '@/utils/utils';
import CartButton from './cart-button';
import { WishlistButton } from './wishlist-button';

const ProductCard = memo(
	({ id, product, imageUrl, productName, price, rating, reviews, discount, colors }: Product) => {
		const [selected, setSelected] = useState(0);

		return (
			<div className="group/card w-[300px] min-w-[300px]">
				<div className="relative overflow-clip rounded-lg">
					{discount && (
						<span className="absolute top-3 left-3 px-4 py-1 text-sm font-light rounded-sm text-skin-white bg-skin-secondary-2">
							-{discount}%
						</span>
					)}
					<div
						className="max-[270px] flex h-[250px] items-center justify-center bg-skin-secondary"
						style={{
							viewTransitionName: `product-${id}-picture`
						}}
					>
						<img
							className="w-full max-w-[140px] rounded-lg object-cover"
							src={imageUrl}
							alt={productName}
						/>
					</div>
					<div className="flex absolute top-0 right-0 flex-col gap-2 p-3">
						<button type="button" title="Watch" className={cn('p-2 rounded-full duration-150 group')}>
							<img
								src={eyeIcon}
								alt="Eye icon"
								className="transition-all group-hover:invert-25 group-focus-visible:invert"
							/>
						</button>
						<WishlistButton
							productId={id}
							productName={productName}
							className={cn('p-2 rounded-full duration-150 group', '')}
							title="Wishlist"
						>
							<img
								src={heartIcon}
								className="transition-all group-hover:invert-25 group-focus-visible:invert group-data-[state=on]:invert"
								alt="Wishlist icon"
							/>
						</WishlistButton>
					</div>
					<CartButton
						productId={id}
						productName={productName}
						className={cn(
							'absolute bottom-0 left-0 py-2 w-full text-center transition-all translate-y-full cursor-pointer bg-skin-button text-skin-text group-hover/card:translate-y-0 hover:bg-skin-primary-1',
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
									<span className="line-through text-skin-button/50">${price}</span>
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
								<img key={i} src={filledStar} alt="star" className="w-4 h-4" />
							))}
							{[...Array(5 - rating)].map((_, i) => (
								<img key={i} src={emptyStar} alt="empty star" className="w-4 h-4" />
							))}
						</div>
						{reviews && <span className="text-skin-text-2">({reviews})</span>}
					</div>
					<div className="flex gap-2">
						{colors?.map((color, i) => (
							<button
								onClick={() => setSelected(i)}
								key={color}
								className={cn('size-4 rounded-full', {
									'ring-2 ring-black': selected === i
								})}
								style={{ backgroundColor: color }}
							></button>
						))}
					</div>
				</Link>
			</div>
		);
	}
);

export default ProductCard;

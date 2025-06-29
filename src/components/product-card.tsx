import filledStar from '@/assets/star-filled.svg';
import emptyStar from '@/assets/star-empty.svg';

import eyeIcon from '@/assets/fill-eye.svg';
import heartIcon from '@/assets/fill-heart.svg';
import type { Product } from '@/utils/utils';
import { cn } from '$/lib/utils';
import { memo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { WishlistButton } from './wishlist-button';
import CartButton from './cart-button';
const ProductCard = memo(
	({ id, product, imageUrl, productName, price, rating, reviews, discount, colors }: Product) => {
		const [selected, setSelected] = useState(0);

		return (
			<>
				<div className="group/card w-[300px] min-w-[300px]">
					<div className="relative overflow-clip rounded-lg">
						{discount && (
							<span className="text-skin-white absolute top-3 left-3 rounded-sm bg-skin-secondary-2 px-4 py-1 text-sm font-light">
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
						<div className="absolute top-0 right-0 flex flex-col gap-2 p-3">
							<button title="Watch" className={cn('group rounded-full p-2 duration-150')}>
								<img
									src={eyeIcon}
									alt="Eye icon"
									className="transition-all group-hover:invert-25 group-focus-visible:invert"
								/>
							</button>
							<WishlistButton
								productId={id}
								className={cn('group rounded-full p-2 duration-150', '')}
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
							className={cn(
								'absolute bottom-0 left-0 w-full translate-y-full cursor-pointer bg-skin-button py-2 text-center text-skin-text transition-all group-hover/card:translate-y-0 hover:bg-skin-primary-1',
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
						<div className="flex items-center justify-start gap-2">
							<div className="flex gap-1">
								{[...Array(rating)].map((_, i) => (
									<img key={i} src={filledStar} alt="star" className="h-4 w-4" />
								))}
								{[...Array(5 - rating)].map((_, i) => (
									<img key={i} src={emptyStar} alt="empty star" className="h-4 w-4" />
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
			</>
		);
	}
);

export default ProductCard;

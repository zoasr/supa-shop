import { Toggle } from '$/components/ui/toggle';
import type * as TogglePrimitive from '@radix-ui/react-toggle';
import { useRouter } from '@tanstack/react-router';
import { useCallback, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useWishlistStore } from '@/store/wishlist';

export const WishlistButton = ({
	productId,
	children,
	...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & {
	productId: number;
	children: React.ReactNode;
}) => {
	const router = useRouter();
	const wishlist = useWishlistStore(useShallow((state) => state.wishlist));
	const count = useWishlistStore(useShallow((state) => state.count));
	const setCount = useWishlistStore(useShallow((state) => state.setCount));
	const addToWishList = useWishlistStore(useShallow((state) => state.addToWishList));
	const removeFromWishList = useWishlistStore(useShallow((state) => state.removeFromWishList));
	const isWhishlisted = useMemo(() => wishlist?.some((item) => item.product_id === productId), [wishlist, productId]);
	const handleToggle = useCallback(
		async (isOn: boolean) => {
			if (isOn) {
				setCount(count + 1);
				await addToWishList(productId);
			} else {
				setCount(count - 1);
				await removeFromWishList(productId);
			}
			router.invalidate();
		},
		[productId, count, setCount, addToWishList, removeFromWishList, router.invalidate]
	);
	return (
		<Toggle
			{...props}
			onPressedChange={handleToggle}
			pressed={isWhishlisted}
			data-state={isWhishlisted ? 'on' : 'off'}
		>
			{children}
		</Toggle>
	);
};

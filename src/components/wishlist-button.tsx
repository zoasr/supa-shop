import { Toggle } from '$/components/ui/toggle';
import type * as TogglePrimitive from '@radix-ui/react-toggle';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';
import { useWishlistStore } from '@/store/wishlist';
import { isLoggedIn } from '@/utils/supabase';

export const WishlistButton = ({
	productId,
	children,
	...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & {
	productId: number;
	children: React.ReactNode;
}) => {
	const { data: loggedIn } = useQuery({ queryKey: ['loggedIn'], queryFn: () => isLoggedIn() });
	const router = useRouter();
	const wishlist = useWishlistStore(useShallow((state) => state.wishlist));
	const count = useWishlistStore(useShallow((state) => state.count));
	const setCount = useWishlistStore(useShallow((state) => state.setCount));
	const addToWishList = useWishlistStore(useShallow((state) => state.addToWishList));
	const removeFromWishList = useWishlistStore(useShallow((state) => state.removeFromWishList));
	const isWhishlisted = useMemo(() => wishlist?.some((item) => item.product_id === productId), [wishlist, productId]);
	const handleToggle = useCallback(
		async (isOn: boolean) => {
			if (!loggedIn) {
				toast.error('You must be logged in to add to wishlist', {
					action: {
						label: 'Login',
						onClick: () => router.navigate({ to: '/login' })
					},
					classNames: {
						actionButton:
							'!text-(--error-bg) !bg-(--error-text) ring-(--error-border) ring-2 hover:ring-4 transition-all'
					}
				});
				return;
			}
			if (isOn) {
				setCount(count + 1);
				await addToWishList(productId);
			} else {
				setCount(count - 1);
				await removeFromWishList(productId);
			}
			router.invalidate();
		},
		[productId, count, setCount, addToWishList, removeFromWishList, router.invalidate, loggedIn, router.navigate]
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

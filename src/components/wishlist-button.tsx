import { Toggle } from '$/components/ui/toggle';
import type * as TogglePrimitive from '@radix-ui/react-toggle';
import { useQuery } from '@tanstack/react-query';
import { useLoaderData, useRouter } from '@tanstack/react-router';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useWishlist, useWishlistActions, useWishlistCount } from '@/store/wishlist';
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
	const { products } = useLoaderData({ from: '__root__' });
	const { t } = useTranslation();
	const router = useRouter();
	const { setCount, addToWishList, removeFromWishList } = useWishlistActions();
	const wishlist = useWishlist();
	const count = useWishlistCount();
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
			if (!products || products instanceof Error) return;
			const product = products.find((item) => item.id === productId);
			if (isOn) {
				setCount(count + 1);
				const res = await addToWishList(productId);
				if (product) {
					if (res instanceof Error) {
						toast.error(t('common.productErrorWishlist', { productName: product.productName }));
					} else {
						toast.success(
							t('common.productAddedWishlist', {
								productName: product.productName
							})
						);
					}
				}
			} else {
				setCount(count - 1);
				const res = await removeFromWishList(productId);
				if (product) {
					if (res instanceof Error) {
						toast.error(t('common.productErrorWishlist', { productName: product.productName }));
					} else {
						toast.success(
							t('common.productRemovedWishlist', {
								productName: product.productName
							})
						);
					}
				}
			}
			router.invalidate();
		},
		[
			productId,
			count,
			setCount,
			addToWishList,
			removeFromWishList,
			router.invalidate,
			loggedIn,
			router.navigate,
			products,
			t
		]
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

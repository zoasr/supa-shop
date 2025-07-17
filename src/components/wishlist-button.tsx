import { Toggle } from '$/components/ui/toggle';
import type * as TogglePrimitive from '@radix-ui/react-toggle';
import { useQuery } from '@tanstack/react-query';
import { useLoaderData, useRouter } from '@tanstack/react-router';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useIsProductInWishlist, useWishlistActions } from '@/store/wishlist';
import { isLoggedIn } from '@/utils/supabase';

const MemoizedToggle = memo(Toggle);

export const WishlistButton = memo(
	({
		productId,
		children,
		...props
	}: React.ComponentProps<typeof TogglePrimitive.Root> & {
		productId: number;
		children: React.ReactNode;
	}) => {
		const { data: loggedIn } = useQuery({
			queryKey: ['loggedIn'],
			queryFn: isLoggedIn
		});
		const { products } = useLoaderData({ from: '__root__' });
		const { t } = useTranslation();
		const router = useRouter();
		const isWhishlisted = useIsProductInWishlist(productId);
		const { incrementCount, decrementCount, addToWishList, removeFromWishList } = useWishlistActions();
		const product = useMemo(() => {
			if (products instanceof Error) return undefined;
			return products?.find((item) => item.id === productId);
		}, [products, productId]);

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

				if (!product) return;

				if (isOn) {
					incrementCount();
					const res = await addToWishList(productId);
					if (res instanceof Error) {
						toast.error(t('common.productErrorWishlist', { productName: product.productName }));
					} else {
						toast.success(
							t('common.productAddedWishlist', {
								productName: product.productName
							})
						);
					}
				} else {
					decrementCount();
					const res = await removeFromWishList(productId);
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
			},
			[loggedIn, product, productId, router, t, addToWishList, removeFromWishList, incrementCount, decrementCount]
		);

		return (
			<MemoizedToggle
				{...props}
				onPressedChange={handleToggle}
				pressed={isWhishlisted}
				aria-label={isWhishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
			>
				{children}
			</MemoizedToggle>
		);
	},
	(prevProps, nextProps) => {
		return prevProps.productId === nextProps.productId && prevProps.children === nextProps.children;
	}
);

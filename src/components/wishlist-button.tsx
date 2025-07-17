import { Toggle } from '$/components/ui/toggle';
import type * as TogglePrimitive from '@radix-ui/react-toggle';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useIsProductInWishlist, useWishlistActions } from '@/store/wishlist';
import { isLoggedIn } from '@/utils/supabase';

const MemoizedToggle = memo(Toggle);

type WishlistButtonProps = React.ComponentProps<typeof TogglePrimitive.Root> & {
	productId: number;
	productName: string;
};

export const WishlistButton: React.FC<WishlistButtonProps> = memo(
	({ productId, productName, children, ...props }) => {
		const { data: loggedIn } = useQuery({
			queryKey: ['loggedIn'],
			queryFn: isLoggedIn
		});
		const { t } = useTranslation();
		const router = useRouter();
		const isWhishlisted = useIsProductInWishlist(productId);
		const { incrementCount, decrementCount, addToWishList, removeFromWishList } = useWishlistActions();

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
					incrementCount();
					const res = await addToWishList(productId);
					if (res instanceof Error) {
						toast.error(t('common.productErrorWishlist', { productName: productName }));
					} else {
						toast.success(
							t('common.productAddedWishlist', {
								productName: productName
							})
						);
					}
				} else {
					decrementCount();
					const res = await removeFromWishList(productId);
					if (res instanceof Error) {
						toast.error(t('common.productErrorWishlist', { productName: productName }));
					} else {
						toast.success(
							t('common.productRemovedWishlist', {
								productName: productName
							})
						);
					}
				}
			},
			[
				loggedIn,
				productName,
				productId,
				router,
				t,
				addToWishList,
				removeFromWishList,
				incrementCount,
				decrementCount
			]
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

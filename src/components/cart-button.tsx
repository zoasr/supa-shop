import { Toggle } from '$/components/ui/toggle';
import type * as TogglePrimitive from '@radix-ui/react-toggle';
import { useQuery } from '@tanstack/react-query';
import { useLoaderData, useRouter } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useCartActions, useIsProductInCart } from '@/store/cart';
import { isLoggedIn } from '@/utils/supabase';

const MemoizedToggle = memo(Toggle);

type CartButtonProps = Omit<React.ComponentProps<typeof TogglePrimitive.Root>, 'children'> & {
	productId: number;
	quantity?: number;
	color?: string;
	children: ReactNode | ((isAdded: boolean) => ReactNode);
};

const CartButton: React.FC<CartButtonProps> = memo(
	({ productId, children, quantity = 1, color, ...props }) => {
		const { data: loggedIn } = useQuery({
			queryKey: ['isLoggedIn'],
			queryFn: isLoggedIn
		});
		const { products } = useLoaderData({ from: '__root__' });
		const { t } = useTranslation();
		const isAdded = useIsProductInCart(productId);
		const { incrementCount, decrementCount, addToCart, removeFromCart } = useCartActions();
		const router = useRouter();

		const product = useMemo(() => {
			if (!products || products instanceof Error) return undefined;
			return products.find((item) => item.id === productId);
		}, [products, productId]);

		const handleToggle = useCallback(
			async (isOn: boolean) => {
				if (!loggedIn) {
					toast.error('You must be logged in to add to cart', {
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
					const res = await addToCart(productId, quantity);
					if (res instanceof Error) {
						toast.error(t('common.productErrorCart', { productName: product.productName }));
					} else {
						toast.success(
							t('common.productAddedCart', {
								productName: product.productName
							})
						);
					}
				} else {
					decrementCount();
					const res = await removeFromCart(productId);
					if (res instanceof Error) {
						toast.error(t('common.productErrorCart', { productName: product.productName }));
					} else {
						toast.success(
							t('common.productRemovedCart', {
								productName: product.productName
							})
						);
					}
				}
				router.invalidate();
			},
			[
				loggedIn,
				product,
				productId,
				quantity,
				router,
				t,
				incrementCount,
				decrementCount,
				addToCart,
				removeFromCart
			]
		);

		return (
			<MemoizedToggle
				{...props}
				onPressedChange={handleToggle}
				pressed={isAdded}
				data-productid={productId}
				variant="default"
				aria-label={isAdded ? 'Remove from cart' : 'Add to cart'}
			>
				{typeof children === 'function'
					? (children as (isAdded: boolean) => ReactNode)(isAdded ?? false)
					: children}
			</MemoizedToggle>
		);
	},
	(prevProps, nextProps) => {
		return prevProps.productId === nextProps.productId && prevProps.children === nextProps.children;
	}
);

export default CartButton;

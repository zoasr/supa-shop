import { Toggle } from '$/components/ui/toggle';
import type * as TogglePrimitive from '@radix-ui/react-toggle';
import { useQuery } from '@tanstack/react-query';
import { useLoaderData, useRouter } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { memo, useCallback, useMemo } from 'react';
import { useCart, useCartActions, useCartCount } from '@/store/cart';
import { isLoggedIn } from '@/utils/supabase';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

type CartButtonProps = Omit<React.ComponentProps<typeof TogglePrimitive.Root>, 'children'> & {
	productId: number;
	quantity?: number;
	color?: string;
	children: ReactNode | ((isAdded: boolean) => ReactNode);
};

const CartButton: React.FC<CartButtonProps> = memo(({ productId, children, quantity, color, ...props }) => {
	const { data: loggedIn } = useQuery({ queryKey: ['isLoggedIn'], queryFn: () => isLoggedIn() });
	const { products } = useLoaderData({ from: '__root__' });
	const { t } = useTranslation();
	const cart = useCart();
	const count = useCartCount();
	const { setCount, addToCart, removeFromCart } = useCartActions();
	const router = useRouter();
	const isAdded = useMemo(() => cart?.some((item) => item.product_id === productId), [cart, productId]);
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
			if (!products || products instanceof Error) return;
			const product = products.find((item) => item.id === productId);
			if (isOn) {
				setCount(count + 1);
				await addToCart(productId, quantity);
				const res = await addToCart(productId);
				if (product) {
					if (res instanceof Error) {
						toast.error(t('common.productErrorCart', { productName: product.productName }));
					} else {
						toast.success(
							t('common.productAddedCart', {
								productName: product.productName
							})
						);
					}
				}
			} else {
				setCount(count - 1);
				await removeFromCart(productId);
				const res = await removeFromCart(productId);
				if (product) {
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
			}
			router.invalidate();
		},
		[productId, count, setCount, addToCart, removeFromCart, quantity, router, loggedIn, products, t]
	);

	return (
		<Toggle
			{...props}
			onPressedChange={handleToggle}
			pressed={isAdded}
			data-productid={productId}
			variant="default"
		>
			{typeof children === 'function'
				? (children as (isAdded: boolean) => ReactNode)(isAdded ?? false)
				: children}
		</Toggle>
	);
});

export default CartButton;

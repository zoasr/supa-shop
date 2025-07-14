import { Toggle } from '$/components/ui/toggle';
import type * as TogglePrimitive from '@radix-ui/react-toggle';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { memo, useCallback, useMemo } from 'react';
import { useCartStore } from '@/store/cart';
import { isLoggedIn } from '@/utils/supabase';
import { toast } from 'sonner';

type CartButtonProps = Omit<React.ComponentProps<typeof TogglePrimitive.Root>, 'children'> & {
	productId: number;
	quantity?: number;
	color?: string;
	children: ReactNode | ((isAdded: boolean) => ReactNode);
};

const CartButton: React.FC<CartButtonProps> = memo(({ productId, children, quantity, color, ...props }) => {
	const { data: loggedIn } = useQuery({ queryKey: ['isLoggedIn'], queryFn: () => isLoggedIn() });
	const cart = useCartStore((state) => state.cart);
	const count = useCartStore((state) => state.count);
	const setCount = useCartStore((state) => state.setCount);
	const addToCart = useCartStore((state) => state.addToCart);
	const removeFromCart = useCartStore((state) => state.removeFromCart);
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
			if (isOn) {
				setCount(count + 1);
				await addToCart(productId, quantity);
			} else {
				setCount(count - 1);
				await removeFromCart(productId);
			}
			router.invalidate();
		},
		[productId, count, setCount, addToCart, removeFromCart, quantity, router, loggedIn]
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

import { Toggle } from "$/components/ui/toggle";
import { useCartStore } from "@/store/cart";
import { memo, useCallback, useMemo } from "react";
import type { ReactNode } from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { useRouter } from "@tanstack/react-router";

type CartButtonProps = Omit<
	React.ComponentProps<typeof TogglePrimitive.Root>,
	"children"
> & {
	productId: number;
	quantity?: number;
	color?: string;
	children: ReactNode | ((isAdded: boolean) => ReactNode);
};

const CartButton: React.FC<CartButtonProps> = memo(
	({ productId, children, quantity, color, ...props }) => {
		const cart = useCartStore((state) => state.cart);
		const count = useCartStore((state) => state.count);
		const setCount = useCartStore((state) => state.setCount);
		const addToCart = useCartStore((state) => state.addToCart);
		const removeFromCart = useCartStore((state) => state.removeFromCart);
		const router = useRouter();
		const isAdded = useMemo(
			() => cart?.some((item) => item.product_id === productId),
			[cart, productId]
		);
		const handleToggle = useCallback(
			async (isOn: boolean) => {
				if (isOn) {
					setCount(count + 1);
					await addToCart(productId, quantity);
				} else {
					setCount(count - 1);
					await removeFromCart(productId);
				}
				router.invalidate();
			},
			[productId, count, setCount, addToCart, removeFromCart]
		);

		return (
			<Toggle
				{...props}
				onPressedChange={handleToggle}
				pressed={isAdded}
				data-productid={productId}
			>
				{typeof children === "function"
					? (children as (isAdded: boolean) => ReactNode)(
							isAdded ?? false
					  )
					: children}
			</Toggle>
		);
	}
);

export default CartButton;

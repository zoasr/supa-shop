import { useCartStore } from "@/store/cart";
import type { CartItem, Product } from "@/utils/utils";

interface CartTotalProps {
	products: (Product | null)[];
	cart: CartItem[] | null;
}

const calculatePrice = (product: Product): number => {
	if (product.price && !product.discount) {
		return product.price;
	} else if (product.price && product.discount) {
		return product.price - product.price * (product.discount / 100);
	}
	return 0;
};

export function CartTotal({ products }: CartTotalProps) {
	const cart = useCartStore((state) => state.cart);
	const calculateSubtotal = (): number => {
		return products.reduce<number>((total, product) => {
			if (!product || !product.price) return total;
			const cartItem = cart?.find(
				(item) => item.product_id === product.id
			);
			const price = calculatePrice(product);
			return total + price * (cartItem?.quantity || 0);
		}, 0);
	};

	const subtotal = calculateSubtotal();
	const shipping: number = 0; // Free shipping
	const total = subtotal + shipping;

	return (
		<div className="w-full max-w-md p-6 bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] mt-8 justify-self-end">
			<h3 className="text-xl font-semibold mb-4">Cart Total</h3>
			<div className="space-y-2 mb-6">
				<div className="flex justify-between">
					<span>Subtotal:</span>
					<span>${subtotal.toFixed(2)}</span>
				</div>
				<div className="flex justify-between">
					<span>Shipping:</span>
					<span>
						{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
					</span>
				</div>
				<div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 mt-2">
					<span>Total:</span>
					<span>${total.toFixed(2)}</span>
				</div>
			</div>
			<button
				className="w-full bg-red-600 text-white py-3 rounded-md font-medium hover:bg-red-700 transition-colors"
				onClick={() => alert("Proceeding to checkout")}
			>
				Proceed to Checkout
			</button>
		</div>
	);
}

import { Button } from '$/components/ui/button';
import { useCartStore } from '@/store/cart';
import type { CartItem, Product } from '@/utils/utils';
import { useTranslation } from 'react-i18next';

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
	const { t } = useTranslation();
	const cart = useCartStore((state) => state.cart);
	const calculateSubtotal = (): number => {
		return products.reduce<number>((total, product) => {
			if (!product || !product.price) return total;
			const cartItem = cart?.find((item) => item.product_id === product.id);
			const price = calculatePrice(product);
			return total + price * (cartItem?.quantity || 0);
		}, 0);
	};

	const subtotal = calculateSubtotal();
	const shipping: number = 0; // Free shipping
	const total = subtotal + shipping;

	return (
		<div className="mt-8 w-full max-w-md justify-self-end rounded-lg bg-skin-secondary p-6 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
			<h3 className="mb-4 text-xl font-semibold">{t('cart.cartTotal')}</h3>
			<div className="mb-6 space-y-2">
				<div className="flex justify-between">
					<span>{t('cart.subtotal')}:</span>
					<span>${subtotal.toFixed(2)}</span>
				</div>
				<div className="flex justify-between">
					<span>{t('cart.shipping')}:</span>
					<span>{shipping === 0 ? t('cart.free') : `$${shipping.toFixed(2)}`}</span>
				</div>
				<div className="flex justify-between pt-2 mt-2 text-lg font-bold border-t border-gray-200">
					<span>{t('cart.total')}:</span>
					<span>${total.toFixed(2)}</span>
				</div>
			</div>

			<Button variant="default" className="w-full" onClick={() => alert('Proceeding to checkout')}>
				{t('cart.proceedToCheckout')}
			</Button>
		</div>
	);
}

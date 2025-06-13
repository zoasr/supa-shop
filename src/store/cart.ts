import { addToCart, getCart, removeFromCart } from "@/utils/supabase";
import { create } from "zustand";

interface CartStore {
	count: number;
	cart: any[] | null;
	refreshCart: () => Promise<void>;
	setCart: (cart: any[]) => void;
	setCount: (count: number) => void;
	addToCart: (productId: number) => void;
	removeFromCart: (productId: number) => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
	count: 0,
	cart: [],
	refreshCart: async (limit: number = 0) => {
		const cart = await getCart(limit);
		if (cart instanceof Error) {
			return;
		}
		set({ count: cart?.length || 0, cart: cart || [] });
	},
	setCart: (cart: any[]) => {
		set({ cart: cart });
	},
	setCount: (count: number) => {
		set({ count: count });
	},
	addToCart: async (productId: number) => {
		set({ cart: [...(get().cart || []), { product_id: productId }] });
		const res = await addToCart(productId);
		if (res instanceof Error) {
			set({
				cart: (get().cart || []).filter(
					(item: { product_id: number }) =>
						item.product_id !== productId
				),
			});
		}
	},
	removeFromCart: async (productId: number) => {
		set({
			cart: (get().cart || []).filter(
				(item: { product_id: number }) => item.product_id !== productId
			),
		});
		const res = await removeFromCart(productId);
		if (res instanceof Error) {
			set({ cart: [...(get().cart || []), { product_id: productId }] });
		}
	},
}));

import { addToCart, getCart, modifyCart, removeFromCart } from '@/utils/supabase';
import type { CartItem } from '@/utils/utils';
import { create } from 'zustand';

interface CartStore {
	count: number;
	cart: Omit<CartItem, 'user_id'>[] | null;
	refreshCart: () => Promise<void>;
	setCart: (cart: Omit<CartItem, 'user_id'>[]) => void;
	setCount: (count: number) => void;
	addToCart: (productId: number, quantity?: number) => Promise<void>;
	removeFromCart: (productId: number) => Promise<void>;
	modifyCart: (productId: number, quantity: number) => Promise<void>;
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
	setCart: (cart: Omit<CartItem, 'user_id'>[]) => {
		set({ cart: cart });
	},
	setCount: (count: number) => {
		set({ count: count });
	},
	addToCart: async (productId: number, quantity: number = 1) => {
		set({
			cart: [...(get().cart || []), { product_id: productId, quantity }]
		});
		const res = await addToCart(productId, quantity);
		console.log(res);
		if (res instanceof Error) {
			set({
				cart: (get().cart || []).filter((item: { product_id: number }) => item.product_id !== productId)
			});
		}
	},
	removeFromCart: async (productId: number) => {
		set({
			cart: (get().cart || []).filter((item: { product_id: number }) => item.product_id !== productId)
		});
		const res = await removeFromCart(productId);
		if (res instanceof Error) {
			set({
				cart: [...(get().cart || []), { product_id: productId, quantity: 1 }]
			});
		}
	},
	modifyCart: async (productId: number, quantity: number = 1) => {
		// First update the UI optimistically
		set((state) => ({
			cart: (state.cart || []).map((item) => (item.product_id === productId ? { ...item, quantity } : item))
		}));

		// Then update the server
		const res = await modifyCart(productId, quantity);
		if (res instanceof Error) {
			// Revert on error
			const currentCart = get().cart;
			if (currentCart) {
				set({
					cart: [...currentCart, { product_id: productId, quantity }]
				});
			}
		}
	}
}));

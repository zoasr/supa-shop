import { useCallback } from 'react';
import { create } from 'zustand';
import { addToCart, getCart, modifyCart, removeFromCart } from '@/utils/supabase';
import type { CartItem } from '@/utils/utils';

interface CartActions {
	refreshCart: () => Promise<void>;
	setCart: (cart: Omit<CartItem, 'user_id'>[]) => void;
	setCount: (count: number) => void;
	incrementCount: () => void;
	decrementCount: () => void;
	addToCart: (productId: number, quantity?: number) => Promise<Awaited<ReturnType<typeof addToCart>>>;
	removeFromCart: (productId: number) => Promise<Awaited<ReturnType<typeof removeFromCart>>>;
	modifyCart: (productId: number, quantity: number) => Promise<Awaited<ReturnType<typeof modifyCart>>>;
}

interface CartStore {
	count: number;
	cart: Omit<CartItem, 'user_id'>[] | null;
	actions: CartActions;
}

const useCartStore = create<CartStore>((set, get) => ({
	count: 0,
	cart: [],
	actions: {
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
		incrementCount: () => {
			set({ count: get().count + 1 });
		},
		decrementCount: () => {
			set({ count: get().count - 1 });
		},
		addToCart: async (productId: number, quantity: number = 1) => {
			set({
				cart: [...(get().cart || []), { product_id: productId, quantity }]
			});
			const res = await addToCart(productId, quantity);
			if (res instanceof Error) {
				set({
					cart: (get().cart || []).filter((item: { product_id: number }) => item.product_id !== productId)
				});
			}
			return res;
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
			return res;
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
			return res;
		}
	}
}));
const useStore = useCartStore;
export const usePlainCart = () => useStore.getState();
export const useCart = () => useStore(useCallback((state: CartStore) => state.cart, []));
export const useCartCount = () => useStore(useCallback((state: CartStore) => state.count, []));
export const useCartActions = () => useStore(useCallback((state: CartStore) => state.actions, []));
export const useIsProductInCart = (productId: number) =>
	useStore(
		useCallback(
			(state: CartStore) =>
				state.cart?.some((item: Omit<CartItem, 'user_id'>) => item.product_id === productId) ?? false,
			[productId]
		)
	);

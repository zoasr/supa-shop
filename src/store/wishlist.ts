import { useCallback } from 'react';
import { create } from 'zustand';
import { addToWishList, getWishList, removeFromWishList } from '@/utils/supabase';
import type { WishlistItemClient } from '@/utils/utils';

interface WishlistActions {
	refreshWishlist: () => Promise<void>;
	setWishlist: (wishlist: WishlistItemClient[]) => void;
	setCount: (count: number) => void;
	incrementCount: () => void;
	decrementCount: () => void;
	addToWishList: (productId: number) => Promise<Awaited<ReturnType<typeof addToWishList>>>;
	removeFromWishList: (productId: number) => Promise<Awaited<ReturnType<typeof removeFromWishList>>>;
}

interface WishlistStore {
	count: number;
	wishlist: WishlistItemClient[] | null;
	actions: WishlistActions;
}

const useWishlistStore = create<WishlistStore>((set, get) => ({
	count: 0,
	wishlist: [],
	actions: {
		refreshWishlist: async (limit: number = 0) => {
			const wishlist = await getWishList(limit);
			if (wishlist instanceof Error) {
				return;
			}
			set({ count: wishlist?.length || 0, wishlist: wishlist || [] });
		},
		setWishlist: (wishlist: WishlistItemClient[]) => {
			set({ wishlist: wishlist });
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
		addToWishList: async (productId: number) => {
			set({
				wishlist: [...(get().wishlist || []), { product_id: productId }]
			});
			const res = await addToWishList(productId);
			if (res instanceof Error) {
				set({
					wishlist: (get().wishlist || []).filter(
						(item: { product_id: number | null }) => item.product_id !== productId
					)
				});
			}
			return res;
		},
		removeFromWishList: async (productId: number) => {
			set({
				wishlist: (get().wishlist || []).filter(
					(item: { product_id: number | null }) => item.product_id !== productId
				)
			});
			const res = await removeFromWishList(productId);
			if (res instanceof Error) {
				set({
					wishlist: [...(get().wishlist || []), { product_id: productId }]
				});
			}
			return res;
		}
	}
}));

const useStore = useWishlistStore;
export const usePlainWishlist = () => useStore.getState();
export const useWishlist = () => useStore(useCallback((state: WishlistStore) => state.wishlist, []));
export const useWishlistCount = () => useStore(useCallback((state: WishlistStore) => state.count, []));
export const useWishlistActions = () => useStore(useCallback((state: WishlistStore) => state.actions, []));
export const useIsProductInWishlist = (productId: number) =>
	useStore(
		useCallback(
			(state: WishlistStore) =>
				state.wishlist?.some((item: WishlistItemClient) => item.product_id === productId) ?? false,
			[productId]
		)
	);

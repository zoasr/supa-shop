import { create } from 'zustand';
import { addToWishList, getWishList, removeFromWishList } from '@/utils/supabase';
import type { WishlistItem } from '@/utils/utils';

interface WishlistActions {
	refreshWishlist: () => Promise<void>;
	setWishlist: (wishlist: Omit<WishlistItem, 'user_id'>[]) => void;
	setCount: (count: number) => void;
	addToWishList: (productId: number) => Promise<Awaited<ReturnType<typeof addToWishList>>>;
	removeFromWishList: (productId: number) => Promise<Awaited<ReturnType<typeof removeFromWishList>>>;
}

interface WishlistStore {
	count: number;
	wishlist: Omit<WishlistItem, 'user_id'>[] | null;
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
		setWishlist: (wishlist: Omit<WishlistItem, 'user_id'>[]) => {
			set({ wishlist: wishlist });
		},
		setCount: (count: number) => {
			set({ count: count });
		},
		addToWishList: async (productId: number) => {
			set({
				wishlist: [...(get().wishlist || []), { product_id: productId }]
			});
			const res = await addToWishList(productId);
			if (res instanceof Error) {
				set({
					wishlist: (get().wishlist || []).filter(
						(item: { product_id: number }) => item.product_id !== productId
					)
				});
			}
			return res;
		},
		removeFromWishList: async (productId: number) => {
			set({
				wishlist: (get().wishlist || []).filter((item: { product_id: number }) => item.product_id !== productId)
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

export const useWishlist = () => useWishlistStore((state) => state.wishlist);
export const useWishlistCount = () => useWishlistStore((state) => state.count);
export const useWishlistActions = () => useWishlistStore((state) => state.actions);
export const usePlainWishlist = () => useWishlistStore.getState();

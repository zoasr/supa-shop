import { create } from 'zustand';
import { addToWishList, getWishList, removeFromWishList } from '@/utils/supabase';
import type { WishlistItem } from '@/utils/utils';

interface WishlistStore {
	count: number;
	wishlist: Omit<WishlistItem, 'user_id'>[] | null;
	refreshWishlist: () => Promise<void>;
	setWishlist: (wishlist: Omit<WishlistItem, 'user_id'>[]) => void;
	setCount: (count: number) => void;
	addToWishList: (productId: number) => Promise<void>;
	removeFromWishList: (productId: number) => Promise<void>;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
	count: 0,
	wishlist: [],
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
				wishlist: (get().wishlist || []).filter((item: { product_id: number }) => item.product_id !== productId)
			});
		}
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
	}
}));

import type { getCartItem, getProduct, getProducts, getWishList } from './supabase';

type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType[number];

export type Timer = {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
};

export type Label = {
	label: string;
	key: keyof Timer;
};

export type Product = Exclude<Awaited<ReturnType<typeof getProduct>>, Error | null>;
export type Products = Exclude<Awaited<ReturnType<typeof getProducts>>, Error | null>;
export type CartItem = Exclude<Awaited<ReturnType<typeof getCartItem>>, Error | null>;
export type CartItemClient = Omit<
	Exclude<Awaited<ReturnType<typeof getCartItem>>, Error | null>,
	'created_at' | 'updated_at' | 'user_id' | 'id'
>;
export type WishlistItem = ArrayElement<Exclude<Awaited<ReturnType<typeof getWishList>>, Error | null>>;
export type WishlistItemClient = Omit<
	ArrayElement<Exclude<Awaited<ReturnType<typeof getWishList>>, Error | null>>,
	'created_at' | 'updated_at' | 'user_id' | 'id'
>;

export type ProfileForm = {
	first_name: string;
	last_name: string;
	email: string;
	address: string;
};

export const debounce = <F extends (...args: string[]) => void>(func: F, wait: number) => {
	let timeout: NodeJS.Timeout | null = null;

	const debounced = (...args: Parameters<F>) => {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};

	debounced.cancel = () => {
		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
		}
	};

	return debounced as F & { cancel: () => void };
};

import type { getCartItem, getProduct, getProducts } from './supabase';

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

export type Product = Awaited<ReturnType<typeof getProduct>>;
export type Products = Awaited<ReturnType<typeof getProducts>>;

export type CartItem = Awaited<ReturnType<typeof getCartItem>>;

export type WishlistItem = Awaited<ReturnType<typeof getCartItem>>;

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

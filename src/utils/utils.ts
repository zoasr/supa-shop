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

export type Product = {
	id: number;
	imageUrl: string;
	productName: string;
	product: string;
	price?: number;
	rating: number;
	reviews?: number;
	discount?: number;
	isNew?: boolean;
	colors?: string[];
	productDescription?: string;
};

export type CartItem = {
	product_id: number;
	user_id: string;
	quantity: number;
};

export type WishlistItem = {
	product_id: number;
	user_id: string;
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

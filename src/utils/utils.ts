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

import { AuthError, createClient } from "@supabase/supabase-js";
import type { CartItem, Product, WishlistItem } from "./utils";

const supabaseUrl = import.meta.env.VITE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const isLoggedIn: () => Promise<boolean | AuthError> = async () => {
	const { data, error } = await supabase.auth.getUser();
	if (error) {
		return error;
	}
	if (data) {
		const user = data.user;
		if (user) {
			return true;
		}
		return false;
	}
	return false;
};

export const getProducts = async () => {
	const response: { data: Product[] | null; error: Error | null } =
		await supabase.from("products").select("*");

	if (response.error) {
		return response.error;
	}
	if (response.data) {
		return response.data;
	}
	return null;
};
export const getProduct = async (id: number | string) => {
	const response: { data: Product | null; error: Error | null } =
		await supabase.from("products").select("*").eq("id", id).single();

	if (response.error) {
		return response.error;
	}
	if (response.data) {
		return response.data;
	}
	return null;
};

export const getProductBySlug = async (slug: string) => {
	const response: { data: Product | null; error: Error | null } =
		await supabase
			.from("products")
			.select("*")
			.eq("product", slug)
			.single();

	if (response.error) {
		return response.error;
	}
	if (response.data) {
		return response.data;
	}
	return null;
};

export const addToWishList = async (producId: number | string) => {
	const { data: userData, error: userError } = await supabase.auth.getUser();
	const { data: productIdData, error: productIdError } = await supabase
		.from("wishlist")
		.select("*")
		.eq("product_id", producId);

	if (productIdError) {
		return productIdError;
	}

	if (userError) {
		return userError;
	}

	if (userData.user && productIdData.length === 0) {
		const userId = userData.user?.id;
		const { data, error } = await supabase
			.from("wishlist")
			.insert({ product_id: producId, user_id: userId });
		if (error) {
			return error;
		}
		if (data) {
			return data;
		}
	}
	return null;
};

export const removeFromWishList = async (producId: number | string) => {
	const { data, error } = await supabase
		.from("wishlist")
		.delete()
		.eq("product_id", producId);
	if (error) {
		return error;
	}
	if (data) {
		return data;
	}
	return null;
};

export const getWishList: (
	limit?: number
) => Promise<WishlistItem[] | null | Error> = async (limit?: number) => {
	if (limit) {
		const {
			data,
			error,
		}: { data: WishlistItem[] | null; error: Error | null } = await supabase
			.from("wishlist")
			.select("*")
			.limit(limit);
		if (error) {
			return error;
		}
		if (data) {
			return data;
		}
		return null;
	}

	const {
		data,
		error,
	}: { data: WishlistItem[] | null; error: Error | null } = await supabase
		.from("wishlist")
		.select("*");
	if (error) {
		return error;
	}
	if (data) {
		return data;
	}
	return null;
};

export const addToCart: (
	producId: number | string,
	quantity: number
) => Promise<CartItem[] | null | Error> = async (
	producId: number | string,
	quantity: number = 1
) => {
	const { data: userData, error: userError } = await supabase.auth.getUser();
	const { data: productIdData, error: productIdError } = await supabase
		.from("wishlist")
		.select("*")
		.eq("product_id", producId);

	if (productIdError) {
		return productIdError;
	}

	if (userError) {
		return userError;
	}

	if (userData.user && productIdData.length === 0) {
		const { data, error } = await supabase.from("cart").insert({
			product_id: producId,
			user_id: userData.user?.id,
			quantity,
		});
		if (error) {
			return error;
		}
		if (data) {
			return data;
		}
	}
	return null;
};

export const removeFromCart = async (producId: number | string) => {
	const { data, error } = await supabase
		.from("cart")
		.delete()
		.eq("product_id", producId);
	if (error) {
		return error;
	}
	if (data) {
		return data;
	}
	return null;
};

export const getCart: (
	limit?: number
) => Promise<CartItem[] | null | Error> = async (limit?: number) => {
	if (limit) {
		const {
			data,
			error,
		}: { data: CartItem[] | null; error: Error | null } = await supabase
			.from("cart")
			.select("*")
			.limit(limit);
		if (error) {
			return error;
		}
		if (data) {
			return data;
		}
	}
	const { data, error }: { data: CartItem[] | null; error: Error | null } =
		await supabase.from("cart").select("*");
	if (error) {
		return error;
	}
	if (data) {
		return data;
	}
	return null;
};

export const getCartItem: (
	id: number | string
) => Promise<CartItem | null | Error> = async (id: number | string) => {
	const { data, error }: { data: CartItem | null; error: Error | null } =
		await supabase.from("cart").select("*").eq("product_id", id).single();
	if (error) {
		return error;
	}
	if (data) {
		return data;
	}
	return null;
};

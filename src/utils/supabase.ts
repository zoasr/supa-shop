import { AuthError, createClient } from "@supabase/supabase-js";

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
	const response = await supabase.from("products").select("*");
	return response.data;
};
export const getProduct = async (id: number | string) => {
	const response = await supabase.from("products").select("*").eq("id", id);
	return response.data;
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

export const getWishList = async (limit?: number) => {
	if (limit) {
		const { data, error } = await supabase
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

	const { data, error } = await supabase.from("wishlist").select("*");
	if (error) {
		return error;
	}
	if (data) {
		return data;
	}
	return null;
};

export const addToCart = async (producId: number | string) => {
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
		const { data, error } = await supabase
			.from("cart")
			.insert({ product_id: producId, user_id: userData.user?.id });
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

export const getCart = async (limit?: number) => {
	if (limit) {
		const { data, error } = await supabase
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
	const { data, error } = await supabase.from("cart").select("*");
	if (error) {
		return error;
	}
	if (data) {
		return data;
	}
	return null;
};

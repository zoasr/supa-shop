import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const isLoggedIn: () => Promise<boolean> = async () => {
	const { data, error } = await supabase.auth.getUser();
	if (error) {
		return false;
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
	if (userError) {
		console.error(userError);
		return;
	}

	if (userData.user) {
		const userId = userData.user?.id;
		const { data, error } = await supabase
			.from("wishlist")
			.insert({ product_id: producId, user_id: userId });
		if (error) {
			console.error(error);
		}
		if (data) {
			console.log(data);
		}
	}
};

export const removeFromWishList = async (producId: number | string) => {
	const { data, error } = await supabase
		.from("wishlist")
		.delete()
		.eq("product_id", producId);
	if (error) {
		console.error(error);
	}
	if (data) {
		console.log(data);
	}
};

export const getWishList = async () => {
	const { data, error } = await supabase.from("wishlist").select("*");
	if (error) {
		console.error(error);
		return null;
	}
	if (data) {
		return data;
	}
};

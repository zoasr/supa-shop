import { Link, useRouter } from "@tanstack/react-router";

import { useTranslation } from "react-i18next";

import searchIcon from "@/assets/icon-search.svg";
import TopCallout from "./top-callout";

import heartIcon from "@/assets/heart small.svg";
import cartIcon from "@/assets/Cart1.svg";
import UserDropdown from "./user-dropdown";
import { cn } from "$/lib/utils";
import { getWishList } from "@/utils/supabase";
import { useEffect, useState } from "react";

const Header = () => {
	const { t } = useTranslation();
	const [listCount, setListCount] = useState(0);

	const getList = async () => {
		const wishList = await getWishList();
		setListCount(wishList?.length || 0);
	};
	useEffect(() => {
		getList();
	});
	return (
		<>
			<TopCallout />
			<header dir={t("dir")} className="border-b-2 border-skin-secondary">
				<div className="container flex flex-wrap gap-12 justify-center items-center px-8 py-4 mx-auto">
					<Link to="/" className="text-2xl font-bold">
						{t("header.title")}
					</Link>
					<nav className="flex gap-12 p-2 whitespace-nowrap">
						<Link
							to="/"
							className="[&.active]:border-b-2 [&.active]:black/50 [&:hover]:border-b-2 [&:hover]:black/50 [&.active]:font-bold transition-all duration-75"
						>
							{t("header.navbar.home")}
						</Link>
						<Link
							to="/contact"
							className="[&.active]:border-b-2 [&.active]:black/50 [&:hover]:border-b-2 [&:hover]:black/50 [&.active]:font-bold transition-all duration-75"
						>
							{t("header.navbar.contact")}
						</Link>
						<Link
							to="/about"
							className="[&.active]:border-b-2 [&.active]:black/50 [&:hover]:border-b-2 [&:hover]:black/50 [&.active]:font-bold transition-all duration-75"
						>
							{t("header.navbar.about")}
						</Link>
						<Link
							to="/signup"
							className="[&.active]:border-b-2 [&.active]:black/50 [&:hover]:border-b-2 [&:hover]:black/50 [&.active]:font-bold transition-all duration-75"
						>
							{t("header.navbar.signup")}
						</Link>
					</nav>
					<label className="flex flex-1 gap-2 px-5 py-2 rounded-lg bg-skin-secondary min-w-fit">
						<input
							type="text"
							className="flex-1 bg-transparent outline-none"
							placeholder={t("header.search.placeholder")}
						/>
						<img src={searchIcon} alt="search icon" />
					</label>
					<div className="flex gap-4 justify-center items-center">
						<Link
							to="/account/wishlist"
							className={cn(
								"group p-2 transition-all relative duration-150 group rounded-full",
								"[&.active]:bg-skin-secondary-2 *:[&.active]:invert",
								"hover:bg-skin-secondary-2",
								"focus-visible:bg-skin-secondary-2"
							)}
						>
							<img
								src={heartIcon}
								alt="search icon"
								className="group-hover:invert group-focus-visible:invert"
							/>
							{listCount > 0 && (
								<span className="flex absolute top-0 -right-2 justify-center items-center text-sm font-bold text-center rounded-full size-5 bg-skin-secondary-2">
									{listCount}
								</span>
							)}
						</Link>
						<Link
							to="/account/cart"
							className={cn(
								"group p-2 transition-all duration-150 group rounded-full",
								"[&.active]:bg-skin-secondary-2 *:[&.active]:invert",
								"hover:bg-skin-secondary-2",
								"focus-visible:bg-skin-secondary-2"
							)}
						>
							<img
								src={cartIcon}
								alt="search icon"
								className="group-hover:invert group-focus-visible:invert"
							/>
						</Link>
						<UserDropdown />
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;

import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import SearchIcon from "@/assets/icon-search.svg?react";
import TopCallout from "./top-callout";
import HeartIcon from "@/assets/heart small.svg?react";
import CartIcon from "@/assets/Cart1.svg?react";
import UserDropdown from "./user-dropdown";
import DarkModeToggle from "./dark-mode-toggle";
import { cn } from "$/lib/utils";
import { useWishlistStore } from "@/store/wishlist";
import { useCartStore } from "@/store/cart";

const WishList = () => {
	const wishCount = useWishlistStore((state) => state.count);

	return (
		<Link
			to="/account/wishlist"
			className={cn(
				"group p-2 transition-all relative duration-150 group rounded-full text-black",
				"[&.active]:bg-skin-secondary-2 *:[&.active]:invert",
				"hover:bg-skin-secondary-2",
				"focus-visible:bg-skin-secondary-2"
			)}
			viewTransition={{ types: ["slide-left"] }}
		>
			<HeartIcon className="group-hover:text-skin-secondary group-focus-visible:text-skin-secondary text-foreground transition-all" />
			{wishCount > 0 && (
				<span className="flex absolute top-0 -right-2 justify-center items-center text-sm font-bold text-center rounded-full size-5 bg-skin-secondary-2">
					{wishCount}
				</span>
			)}
		</Link>
	);
};

const Cart = () => {
	const cartCount = useCartStore((state) => state.count);
	return (
		<Link
			to="/account/cart"
			className={cn(
				"group p-2 transition-all relative duration-150 group rounded-full",
				"[&.active]:bg-skin-secondary-2 *:[&.active]:invert",
				"hover:bg-skin-secondary-2",
				"focus-visible:bg-skin-secondary-2"
			)}
			viewTransition={{ types: ["slide-right"] }}
		>
			{/* <img src={CartIcon} alt="cart icon" /> */}
			<CartIcon className="group-hover:text-skin-secondary group-focus-visible:text-skin-secondary text-foreground transition-all" />
			{cartCount > 0 && (
				<span className="flex absolute top-0 -right-2 justify-center items-center text-sm font-bold text-center rounded-full size-5 bg-skin-secondary-2">
					{cartCount}
				</span>
			)}
		</Link>
	);
};

const Header = () => {
	const { t } = useTranslation();

	return (
		<>
			<TopCallout />
			<header dir={t("dir")} className="border-b-2 border-skin-secondary">
				<div className="container flex flex-wrap gap-12 justify-center items-center px-8 py-4 mx-auto">
					<Link
						to="/"
						className="text-2xl font-bold"
						viewTransition={{ types: ["warp"] }}
					>
						{t("header.title")}
					</Link>
					<nav className="flex gap-12 p-2 whitespace-nowrap">
						<Link
							to="/"
							className="[&.active]:border-b-2 [&.active]:black/50 [&:hover]:border-b-2 [&:hover]:black/50 [&.active]:font-bold transition-all duration-75"
							viewTransition={{ types: ["slide-warp"] }}
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
						{/* <img src={SearchIcon} alt="search icon" /> */}
						<SearchIcon className="text-foreground" />
					</label>
					<div className="flex gap-4 justify-center items-center">
						<WishList />
						<Cart />
						<UserDropdown />
						<DarkModeToggle />
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;

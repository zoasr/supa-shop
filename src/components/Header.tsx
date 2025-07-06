import { cn } from '$/lib/utils';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import CartIcon from '@/assets/Cart1.svg?react';
import HeartIcon from '@/assets/heart small.svg?react';
import SearchIcon from '@/assets/icon-search.svg?react';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import DarkModeToggle from './dark-mode-toggle';
import TopCallout from './top-callout';
import UserDropdown from './user-dropdown';

const WishList = () => {
	const wishCount = useWishlistStore((state) => state.count);

	return (
		<Link
			to="/account/wishlist"
			className={cn(
				'group group relative rounded-full p-2 transition-all duration-150',
				'[&.active]:bg-skin-secondary-2 [&.active]:text-skin-secondary',
				'hover:bg-skin-secondary-2 hover:text-skin-secondary',
				'focus-visible:bg-skin-secondary-2 focus-visible:text-skin-secondary'
			)}
			viewTransition={{ types: ['slide-left'] }}
		>
			<HeartIcon className="transition-all group-hover:text-skin-secondary group-focus-visible:text-skin-secondary" />
			{wishCount > 0 && (
				<span className="absolute top-0 -right-2 flex size-5 items-center justify-center rounded-full bg-skin-secondary-2 text-center text-sm font-bold text-skin-secondary">
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
				'group group relative rounded-full p-2 transition-all duration-150',
				'[&.active]:bg-skin-secondary-2 [&.active]:text-skin-secondary',
				'hover:bg-skin-secondary-2 hover:text-skin-secondary',
				'focus-visible:bg-skin-secondary-2 focus-visible:text-skin-secondary'
			)}
			viewTransition={{ types: ['slide-right'] }}
		>
			{/* <img src={CartIcon} alt="cart icon" /> */}
			<CartIcon className="transition-all group-hover:text-skin-secondary group-focus-visible:text-skin-secondary" />
			{cartCount > 0 && (
				<span className="absolute top-0 -right-2 flex size-5 items-center justify-center rounded-full bg-skin-secondary-2 text-center text-sm font-bold text-skin-secondary">
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
			<header dir={t('dir')} className="border-b-2 border-skin-secondary">
				<div className="container mx-auto flex flex-wrap items-center justify-center gap-12 px-8 py-4">
					<Link to="/" className="text-2xl font-bold" viewTransition={{ types: ['warp'] }}>
						{t('header.title')}
					</Link>
					<nav className="flex gap-12 p-2 whitespace-nowrap">
						<Link
							to="/"
							className="[&.active]:black/50 [&:hover]:black/50 transition-all duration-75 [&.active]:border-b-2 [&.active]:font-bold [&:hover]:border-b-2"
							viewTransition={{ types: ['slide-warp'] }}
						>
							{t('header.navbar.home')}
						</Link>
						<Link
							to="/contact"
							className="[&.active]:black/50 [&:hover]:black/50 transition-all duration-75 [&.active]:border-b-2 [&.active]:font-bold [&:hover]:border-b-2"
						>
							{t('header.navbar.contact')}
						</Link>
						<Link
							to="/about"
							className="[&.active]:black/50 [&:hover]:black/50 transition-all duration-75 [&.active]:border-b-2 [&.active]:font-bold [&:hover]:border-b-2"
						>
							{t('header.navbar.about')}
						</Link>
						<Link
							to="/signup"
							className="[&.active]:black/50 [&:hover]:black/50 transition-all duration-75 [&.active]:border-b-2 [&.active]:font-bold [&:hover]:border-b-2"
						>
							{t('header.navbar.signup')}
						</Link>
					</nav>
					<label className="flex min-w-fit flex-1 gap-2 rounded-lg bg-skin-secondary px-5 py-2">
						<input
							type="text"
							className="flex-1 bg-transparent outline-none"
							placeholder={t('header.search.placeholder')}
						/>
						{/* <img src={SearchIcon} alt="search icon" /> */}
						<SearchIcon className="text-foreground" />
					</label>
					<div className="flex items-center justify-center gap-4">
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

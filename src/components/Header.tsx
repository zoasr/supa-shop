import { cn } from '$/lib/utils';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import CartIcon from '@/assets/Cart1.svg?react';
import HeartIcon from '@/assets/heart small.svg?react';
import { useCartCount } from '@/store/cart';
import { useWishlistCount } from '@/store/wishlist';
import DarkModeToggle from './dark-mode-toggle';
import Search from './search';
import TopCallout from './top-callout';
import UserDropdown from './user-dropdown';

const WishList = () => {
	const wishCount = useWishlistCount();

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
				<span className="flex absolute top-0 -right-2 justify-center items-center text-sm font-bold text-center rounded-full size-5 bg-skin-secondary-2 text-skin-secondary">
					{wishCount}
				</span>
			)}
		</Link>
	);
};

const Cart = () => {
	const cartCount = useCartCount();
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
				<span className="flex absolute top-0 -right-2 justify-center items-center text-sm font-bold text-center rounded-full size-5 bg-skin-secondary-2 text-skin-secondary">
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
				<div className="container flex flex-wrap gap-12 justify-center items-center px-8 py-4 mx-auto">
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
					<Search />
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

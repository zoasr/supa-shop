import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import '../styles.css';
// @ts-ignore
import '@fontsource-variable/inter';
// @ts-ignore
import '@fontsource-variable/rubik';
import '@fontsource/poppins/100.css';
import '@fontsource/poppins/200.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/poppins/900.css';
import { cn } from '$/lib/utils';
import { useTranslation } from 'react-i18next';
import { Toaster } from 'sonner';
import Footer from '@/components/footer';
import Header from '@/components/Header';
import { useCartStore } from '@/store/cart';
import { useThemeStore } from '@/store/theme';
import { useWishlistStore } from '@/store/wishlist';
import { getProducts, getUserImage } from '@/utils/supabase';

const Root = () => {
	const { i18n } = useTranslation();
	return (
		<div
			className={cn(
				{
					'font-rubik': i18n.language === 'ar',
					'font-poppins': i18n.language === 'en'
				},
				'flex min-h-screen flex-col justify-between'
			)}
		>
			<Header />
			<main
				className="flex-1 px-8 py-8 [view-transition-name:main-content]"
				dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
			>
				<Outlet />
			</main>
			<Footer />
			<Toaster position="bottom-right" richColors />
			<TanStackRouterDevtools />
		</div>
	);
};

export const Route = createRootRoute({
	staleTime: 1000 * 3600,
	preloadStaleTime: 1000 * 3600,
	loader: async () => {
		const imageUrl = await getUserImage();
		useWishlistStore.getState().refreshWishlist();
		useCartStore.getState().refreshCart();
		const localTheme = localStorage.getItem('theme') ?? 'light';
		useThemeStore.setState(() => ({ isDarkMode: localTheme === 'dark' }));
		if (localTheme === 'dark') {
			document.documentElement.classList.add('dark');
		}
		const products = await getProducts();
		return { imageUrl, products };
	},
	component: Root
});

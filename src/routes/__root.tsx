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
import { useTranslation } from 'react-i18next';
import { cn } from '$/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import { Toaster } from 'sonner';
import { getUserImage } from '@/utils/supabase';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { useThemeStore } from '@/store/theme';

const Root = () => {
	const { i18n } = useTranslation();
	return (
		<>
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
		</>
	);
};

export const Route = createRootRoute({
	loader: async () => {
		const imageUrl = await getUserImage();
		useWishlistStore.getState().refreshWishlist();
		useCartStore.getState().refreshCart();
		const localTheme = localStorage.getItem('theme') ?? 'light';
		useThemeStore.setState(() => ({ isDarkMode: localTheme === 'dark' }));
		if (localTheme === 'dark') {
			document.documentElement.classList.add('dark');
		}
		return { imageUrl };
	},
	component: Root
});

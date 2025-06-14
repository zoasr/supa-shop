import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../styles.css";
// @ts-ignore
import "@fontsource-variable/inter";
// @ts-ignore
import "@fontsource-variable/rubik";
import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";
import { useTranslation } from "react-i18next";
import { cn } from "$/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import { Toaster } from "sonner";

const Root = () => {
	const { i18n } = useTranslation();

	return (
		<>
			<div
				className={cn(
					{
						"font-rubik": i18n.language === "ar",
						"font-inter": i18n.language === "en",
					},
					"flex flex-col justify-between min-h-screen"
				)}
			>
				<Header />
				<main
					className="flex-1 py-8 px-8 [view-transition-name:main-content]"
					dir={i18n.language === "ar" ? "rtl" : "ltr"}
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
	component: Root,
});

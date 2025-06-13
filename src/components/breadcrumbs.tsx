import { Link, useRouterState } from "@tanstack/react-router";

import { Slash } from "lucide-react";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "$/components/ui/breadcrumb";
import { Fragment, useMemo } from "react";
import { useTranslation } from "react-i18next";

// Helper function to get the product name from the path
const getProductNameFromPath = (path: string): string => {
  // This is a simple implementation - you might want to fetch the actual product name
  // from your state management or API based on the product ID
  const parts = path.split('/');
  const productId = parts[parts.length - 1];
  return `Product ${productId}`; // Default fallback
};

interface BreadcrumbItem {
	path: string;
	segment: string;
	translationKey: string;
	translationParams: Record<string, string>;
	isLast: boolean;
}

const Breadcrumbs = () => {
	const { t } = useTranslation();
	const { location } = useRouterState();

	const breadcrumbs = useMemo<BreadcrumbItem[]>(() => {
		const segments = location.pathname.split("/").filter(Boolean);
		
		// Handle root path
		if (segments.length === 0) {
			return [{
				path: "/",
				segment: "home",
				translationKey: "/",
				translationParams: {},
				isLast: true
			}];
		}

		return segments.map((segment: string, index: number) => {
			const path = `/${segments.slice(0, index + 1).join("/")}`;
			const isDynamic = /^\d+$/.test(segment);

			let translationKey = path;
			const translationParams: Record<string, string> = {};

			if (isDynamic) {
				const parentPath = segments.slice(0, index).join("/");
				translationKey = `/${parentPath}/:id`;
				translationParams.id = segment;
			}

			return {
				path,
				segment: segment === "products" ? "products" : 
					  isDynamic && segments[index - 1] === "products" ? "$productId" : segment,
				translationKey: isDynamic && segments[index - 1] === "products" ? "/products/$productId" : translationKey,
				translationParams: isDynamic && segments[index - 1] === "products" ? { productId: segment } : translationParams,
				isLast: index === segments.length - 1,
			};
		});
	}, [location.pathname]);

	// Helper function to format segment for display
	const formatSegment = (segment: string): string => {
		// Convert kebab-case to Title Case
		return segment
			.split('-')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	// Don't show breadcrumbs if we're on the home page
	if (location.pathname === '/') {
		return null;
	}

	return (
		<Breadcrumb className="mb-6">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link 
							to="/" 
							className="hover:underline"
							viewTransition={{
								types: ["scale-up"],
							}}
						>
							Home
						</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				{breadcrumbs.map(
					({
						path,
						segment,
						translationKey,
						translationParams,
						isLast,
					}) => (
						<Fragment key={path}>
							<BreadcrumbSeparator>
								<Slash className="h-4 w-4" />
							</BreadcrumbSeparator>
							<BreadcrumbItem>
								{isLast ? (
									<span className="font-medium text-foreground">
									{segment === '$productId' 
										? t('breadcrumbs.productId', { 
											productName: getProductNameFromPath(path) 
										})
										: segment === 'products' 
										? t('breadcrumbs.products')
										: formatSegment(segment)
									}
								</span>
								) : (
									<BreadcrumbLink asChild>
										<Link
											to={path}
											className="hover:underline"
											viewTransition={{
												types: ["scale-up"],
											}}
										>
											{segment === '$productId' 
												? t('breadcrumbs.productId', { 
													productName: getProductNameFromPath(path) 
												})
												: segment === 'products' 
												? t('breadcrumbs.products')
												: formatSegment(segment)
											}
										</Link>
									</BreadcrumbLink>
								)}
							</BreadcrumbItem>
						</Fragment>
					)
				)}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default Breadcrumbs;

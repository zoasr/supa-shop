import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator
} from '$/components/ui/breadcrumb';
import { Link, useRouterState } from '@tanstack/react-router';
import { Slash } from 'lucide-react';
import { Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface BreadcrumbItemObj {
	path: string;
	segment: string;
	translationKey: string;
	translationParams: Record<string, string>;
	isLast: boolean;
	isDynamic: boolean;
	displayName?: string;
}

const toTitleCase = (str: string) => {
	return str
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
};

const Breadcrumbs = () => {
	const { t } = useTranslation();
	const { location, matches } = useRouterState();
	const breadcrumbs = useMemo<BreadcrumbItemObj[]>(() => {
		const segments = matches
			// filter out index routes like account and account/
			.filter((match) => match.pathname !== '/' && !match.pathname.endsWith('/'));

		return segments.map((match, index) => {
			const isDynamic = Object.keys(match.params).length > 0;
			let displayName: string | undefined;

			if (isDynamic && match.routeId === '/products/$productId') {
				const loaderData = match.loaderData as {
					product?: { productName?: string };
				};
				if (loaderData?.product?.productName) {
					displayName = loaderData.product.productName;
				}
			}
			return {
				path: match.pathname,
				segment: match.pathname.split('/').pop() || '',
				translationKey: match.pathname.split('/').pop() || '',
				translationParams: {},
				isLast: index === segments.length - 1,
				isDynamic: isDynamic,
				displayName
			};
		});
	}, [matches]);

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
								types: ['scale-up']
							}}
						>
							{t('breadcrumbs./')}
						</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				{breadcrumbs.map(({ path, isLast, isDynamic, translationKey, displayName }) => (
					<Fragment key={path}>
						<BreadcrumbSeparator>
							<Slash className="w-4 h-4" />
						</BreadcrumbSeparator>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								{isLast && isDynamic ? (
									<Link
										to={path}
										className="hover:underline"
										viewTransition={{
											types: ['scale-up']
										}}
									>
										{displayName ?? toTitleCase(translationKey)}
									</Link>
								) : (
									<Link
										to={path}
										className="hover:underline"
										viewTransition={{
											types: ['scale-up']
										}}
									>
										{/* @ts-expect-error */}
										{t(`breadcrumbs.${translationKey}`)}
									</Link>
								)}
							</BreadcrumbLink>
						</BreadcrumbItem>
					</Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default Breadcrumbs;

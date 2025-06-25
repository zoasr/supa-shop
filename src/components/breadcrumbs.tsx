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

interface BreadcrumbItem {
	path: string;
	segment: string;
	translationKey: string;
	translationParams: Record<string, string>;
	isLast: boolean;
	isDynamic: boolean;
}

const toTitleCase = (str: string) => {
	return str
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};

const Breadcrumbs = () => {
	const { t } = useTranslation();
	const { location, matches } = useRouterState();
	const breadcrumbs = useMemo<BreadcrumbItem[]>(() => {
		const segments = matches
			.filter((match) => match.pathname !== "/")
			.map((match) => ({
				path: match.pathname,
				segment: match.pathname.split("/").pop() || "",
				translationKey: match.pathname.split("/").pop() || "",
				translationParams: {},
				isLast: false,
				isDynamic: Object.keys(match.params).length > 0,
			}));

		return segments.map((segment, index) => {
			return {
				path: segment.path,
				segment: segment.segment,
				translationKey: segment.translationKey,
				translationParams: {},
				isLast: index === segments.length - 1,
				isDynamic: segment.isDynamic,
			};
		});
	}, [matches]);

	// Don't show breadcrumbs if we're on the home page
	if (location.pathname === "/") {
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
							{t("breadcrumbs./")}
						</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				{breadcrumbs.map(
					({ path, isLast, isDynamic, translationKey }) => (
						<Fragment key={path}>
							<BreadcrumbSeparator>
								<Slash className="h-4 w-4" />
							</BreadcrumbSeparator>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									{isLast && isDynamic ? (
										<Link
											to={path}
											className="hover:underline"
											viewTransition={{
												types: ["scale-up"],
											}}
										>
											{toTitleCase(translationKey)}
										</Link>
									) : (
										<Link
											to={path}
											className="hover:underline"
											viewTransition={{
												types: ["scale-up"],
											}}
										>
											{t(`breadcrumbs.${translationKey}`)}
										</Link>
									)}
								</BreadcrumbLink>
							</BreadcrumbItem>
						</Fragment>
					)
				)}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default Breadcrumbs;

import { Link, useRouterState } from "@tanstack/react-router";

import { Slash } from "lucide-react";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "$/components/ui/breadcrumb";
import { Fragment } from "react/jsx-runtime";

const toTitleCase = (str: string): string => {
	return str
		.split(/[\s-]+/)
		.map(
			(word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
		)
		.join(" ");
};

const Breadcrumbs = () => {
	const location = useRouterState({
		select: (state) => state.location.pathname,
	});
	const breadCrumbs = location.split("/").filter(Boolean);

	return (
		<Breadcrumb className="mb-10">
			<BreadcrumbList>
				{breadCrumbs.map((crumb, index) => (
					<Fragment key={index}>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link
									to={
										"/" +
										breadCrumbs
											.slice(0, index + 1)
											.join("/")
									}
									viewTransition={{
										types: ["scale-up"],
									}}
								>
									{toTitleCase(crumb)}
								</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						{index !== breadCrumbs.length - 1 && (
							<BreadcrumbSeparator>
								<Slash />
							</BreadcrumbSeparator>
						)}
					</Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default Breadcrumbs;

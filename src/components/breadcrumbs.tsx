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

const toTitleCase = (str: string) => {
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};

const Breadcrumbs = () => {
	const { location } = useRouterState();
	const breadCrumbs = location.href.split("/").filter(Boolean);
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

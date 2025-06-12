import heroImage from "@/assets/hero-image.png";
import appleLogo from "@/assets/apple-logo.svg";
import { Icon } from "@iconify-icon/react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { cn } from "$/lib/utils";

const Category = ({ label, dir }: { label: string; dir: "ltr" | "rtl" }) => {
	return (
		<>
			<li className="flex gap-2 items-center transition-all duration-75 hover:border-b-2 hover:border-skin-secondary">
				<Link to="#">{label}</Link>
				{dir === "rtl" ? (
					<Icon icon="radix-icons:caret-left" />
				) : (
					<Icon icon="radix-icons:caret-right" />
				)}
			</li>
		</>
	);
};

const Hero = () => {
	const { t } = useTranslation();
	return (
		<section className="mb-10" dir={t("dir")}>
			<div className="container flex flex-col gap-8 justify-between md:flex-row">
				<aside
					className={cn(
						"px-8 border-b-2 md:border-b-0 border-skin-secondary",
						{
							"md:border-l-2 ": t("dir") === "rtl",
							"md:border-r-2 ": t("dir") === "ltr",
						}
					)}
				>
					<ul className="flex overflow-auto flex-row gap-4 justify-start items-center px-8 py-8 md:flex-col text-nowrap md:items-start">
						{Array.from({ length: 9 }).map((_, index) => (
							<Category
								key={index}
								dir={t("dir")}
								label={t(
									`hero.categories.category-${index + 1}`
								)}
							/>
						))}
					</ul>
				</aside>
				<div
					className="flex flex-col md:flex-row justify-center items-center gap-8 mt-8 md:py-0 py-10 px-10 max-w-[900px] md:max-h-[350px] bg-black"
					dir="ltr"
				>
					<div className="flex flex-col flex-1 gap-8 justify-start text-skin-text">
						<div className="flex gap-4 items-center font-poppins">
							<img src={appleLogo} alt="" />
							<h1>iPhone 14 series</h1>
						</div>
						<h1 className="text-5xl font-poppins">
							Up to 10% off Voucher
						</h1>
						<button className="flex items-center text-skin-text">
							<span className="transition-all duration-75 hover:border-b-2">
								Shop Now
							</span>
							<Icon icon="formkit:arrowright" />
						</button>
					</div>
					<div>
						<img
							src={heroImage}
							alt="hero"
							className="object-cover w-full h-full"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;

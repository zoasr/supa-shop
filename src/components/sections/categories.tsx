import { useTranslation } from "react-i18next";
import SectionLabel from "./section-label";

import arrowLeft from "@/assets/icons_arrow-left.svg";
import arrowRight from "@/assets/icons_arrow-right.svg";
import categoryCamera from "@/assets/Category-Camera.svg";
import categoryComputer from "@/assets/Category-Computer.svg";
import categoryHeadphone from "@/assets/Category-Headphone.svg";
import categoryGamepad from "@/assets/Category-Gamepad.svg";
import categoryCellPhone from "@/assets/Category-CellPhone.svg";
import categorySmartWatch from "@/assets/Category-SmartWatch.svg";

import { useRef } from "react";

const Category = ({ label, image }: { label: string; image: string }) => {
	return (
		<>
			<div className="flex flex-col gap-4 items-center px-14 py-4 text-center bg-transparent rounded-lg ring-2 transition-all duration-75 cursor-pointer group ring-black/30 hover:bg-skin-secondary-2 hover:text-skin-text hover:ring-0">
				<img src={image} className="group-hover:invert" alt={label} />
				<p className="text-xl font-medium">{label}</p>
			</div>
		</>
	);
};
const Categories = () => {
	const carouselRef = useRef<HTMLDivElement>(null);
	const { t } = useTranslation();
	const categories = [
		{
			label: t("categories.phones"),
			image: categoryCellPhone,
		},
		{
			label: t("categories.gaming"),
			image: categoryGamepad,
		},
		{
			label: t("categories.camera"),
			image: categoryCamera,
		},
		{
			label: t("categories.computers"),
			image: categoryComputer,
		},
		{
			label: t("categories.headphones"),
			image: categoryHeadphone,
		},
		{
			label: t("categories.watches"),
			image: categorySmartWatch,
		},
	];
	return (
		<>
			<section
				className="my-10 border-b-2 border-solid border-skin-secondary"
				dir={t("dir")}
			>
				<div className="container mx-auto">
					<SectionLabel title={t("categories.label")} />
					<div className="flex flex-col gap-4 justify-between items-center w-full md:flex-row">
						<h1 className="text-5xl font-medium">
							{t("categories.title")}
						</h1>
						<div className="flex gap-2" dir={"ltr"}>
							<button
								className="p-4 rounded-full bg-skin-secondary"
								onClick={() => {
									carouselRef.current?.scrollBy({
										left: -200,
										behavior: "smooth",
									});
								}}
							>
								<img src={arrowLeft} alt="" />
							</button>
							<button
								className="p-4 rounded-full bg-skin-secondary"
								onClick={() => {
									carouselRef.current?.scrollBy({
										left: 200,
										behavior: "smooth",
									});
								}}
							>
								<img src={arrowRight} alt="" />
							</button>
						</div>
					</div>
					<div
						ref={carouselRef}
						className="flex overflow-x-auto overflow-y-visible gap-4 p-4 my-8"
					>
						{categories.map((category) => (
							<Category key={category.label} {...category} />
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default Categories;

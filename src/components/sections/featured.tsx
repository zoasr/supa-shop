import { useTranslation } from "react-i18next";
import SectionLabel from "./section-label";

import frame1 from "@/assets/frame-1.png";
import frame2 from "@/assets/frame-2.png";
import frame3 from "@/assets/frame-3.png";
import frame4 from "@/assets/frame-4.png";
import { Link } from "@tanstack/react-router";

const frames = [frame1, frame2, frame3, frame4];

const columns = [1, 3, 3, 4];
const columnspans = [2, 2, 1, 1];
const rows = [1, 1, 2, 2];
const rowspans = [2, 1, 1, 1];

const Featured = () => {
	const { t } = useTranslation();
	return (
		<>
			<section className="py-8 my-10 border-b-2 border-skin-secondary">
				<div className="container mx-auto space-y-4">
					<SectionLabel title={t("featured.label")} />
					<h1 className="text-3xl font-semibold">
						{t("featured.title")}
					</h1>
					<div className="flex flex-col grid-cols-4 grid-rows-2 gap-4 md:grid">
						{frames.map((frame, index) => (
							<Link
								to={"/"}
								key={index}
								style={{
									gridColumn: `${columns[index]} / ${columnspans[index] + columns[index]}`,
									gridRow: `${rows[index]} / ${rowspans[index] + rows[index]}`,
								}}
							>
								<img
									src={frame}
									alt="frame"
									className="w-full h-full rounded-lg"
								/>
							</Link>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default Featured;

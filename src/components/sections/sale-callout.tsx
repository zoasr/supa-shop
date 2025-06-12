import jblImage from "@/assets/JBL.png";
import type { Label, Timer } from "@/utils/utils";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const endTime = new Date().getTime() + 6 * 3600 * 24 * 1000;
function SaleCountdown() {
	const { t } = useTranslation();
	const labels: Label[] = [
		{
			label: t("time.days"),
			key: "days",
		},
		{
			label: t("time.hours"),
			key: "hours",
		},
		{
			label: t("time.minutes"),
			key: "minutes",
		},
		{
			label: t("time.seconds"),
			key: "seconds",
		},
	];
	const [timer, setTimer] = useState<Timer>({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});
	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date().getTime();
			const distance = endTime - now;
			const days = Math.floor(distance / (1000 * 60 * 60 * 24));
			const hours = Math.floor(
				(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			const minutes = Math.floor(
				(distance % (1000 * 60 * 60)) / (1000 * 60)
			);
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);
			setTimer({ days, hours, minutes, seconds });
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, [endTime]);
	return (
		<>
			<div className="flex gap-4 items-center text-pretty" dir={t("dir")}>
				{labels.map((label) => (
					<Fragment key={label.key}>
						<div className="flex flex-col font-poppins items-center text-center justify-center text-black bg-white rounded-full size-[70px]">
							<div className="text-base font-semibold">
								{timer[label.key].toLocaleString("en-US", {
									minimumIntegerDigits: 2,
								})}
							</div>
							<div className="text-xs">{label.label}</div>
						</div>
					</Fragment>
				))}
			</div>
		</>
	);
}

const SaleCallout = () => {
	return (
		<>
			<section className="my-8">
				<div className="container flex flex-col px-12 py-4 mx-auto bg-black w-fit md:flex-row text-skin-text">
					<div className="flex flex-col gap-4 justify-around">
						<h2 className="font-semibold text-skin-button-1">
							Categories
						</h2>
						<h1 className="text-5xl font-medium">
							Enhance Your Music Experience
						</h1>
						<SaleCountdown />
						<button className="px-8 py-4 font-medium rounded-lg w-fit bg-skin-button-1 text-skin-text-2">
							Buy Now!
						</button>
					</div>
					<div className="flex relative items-center">
						<img
							src={jblImage}
							alt="JBL"
							className="object-contain relative"
							style={{ zIndex: 2 }}
						/>
						<div
							className="absolute top-0 left-1/2 w-full h-full -translate-x-1/2"
							style={{
								background:
									"radial-gradient(#D9D9D9 10%, transparent 70%, transparent 100%)",
								zIndex: 0,
							}}
						></div>
					</div>
				</div>
			</section>
		</>
	);
};

export default SaleCallout;

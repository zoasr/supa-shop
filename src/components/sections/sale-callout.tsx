import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import jblImage from '@/assets/JBL.png';
import type { Label, Timer } from '@/utils/utils';

const endTime = Date.now() + 6 * 3600 * 24 * 1000;
function SaleCountdown() {
	const { t } = useTranslation();
	const labels: Label[] = [
		{
			label: t('time.days'),
			key: 'days'
		},
		{
			label: t('time.hours'),
			key: 'hours'
		},
		{
			label: t('time.minutes'),
			key: 'minutes'
		},
		{
			label: t('time.seconds'),
			key: 'seconds'
		}
	];
	const [timer, setTimer] = useState<Timer>({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	});
	useEffect(() => {
		const interval = setInterval(() => {
			const now = Date.now();
			const distance = endTime - now;
			const days = Math.floor(distance / (1000 * 60 * 60 * 24));
			const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);
			setTimer({ days, hours, minutes, seconds });
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, []);
	return (
		<div className="flex items-center gap-4 text-pretty" dir={t('dir')}>
			{labels.map((label) => (
				<Fragment key={label.key}>
					<div className="flex size-[70px] flex-col items-center justify-center rounded-full bg-white text-center font-poppins text-black">
						<div className="text-base font-semibold">
							{timer[label.key].toLocaleString('en-US', {
								minimumIntegerDigits: 2
							})}
						</div>
						<div className="text-xs">{label.label}</div>
					</div>
				</Fragment>
			))}
		</div>
	);
}

const SaleCallout = () => {
	return (
		<section className="my-8">
			<div className="container mx-auto flex w-fit flex-col bg-black px-12 py-4 text-skin-text md:flex-row">
				<div className="flex flex-col justify-around gap-4">
					<h2 className="font-semibold text-skin-button-1">Categories</h2>
					<h1 className="text-5xl font-medium text-white">Enhance Your Music Experience</h1>
					<SaleCountdown />
					<button className="w-fit rounded-lg bg-skin-button-1 px-8 py-4 font-medium text-skin-text-2">
						Buy Now!
					</button>
				</div>
				<div className="relative flex items-center">
					<img src={jblImage} alt="JBL" className="relative object-contain" style={{ zIndex: 2 }} />
					<div
						className="absolute top-0 left-1/2 h-full w-full -translate-x-1/2"
						style={{
							background: 'radial-gradient(#D9D9D9 10%, transparent 70%, transparent 100%)',
							zIndex: 0
						}}
					></div>
				</div>
			</div>
		</section>
	);
};

export default SaleCallout;

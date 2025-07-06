import { Button } from '$/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ArrowLeft from '@/assets/icons_arrow-left.svg?react';
import ArrowRight from '@/assets/icons_arrow-right.svg?react';
import { supabase } from '@/utils/supabase';
import type { Label, Product, Timer } from '@/utils/utils';
import ErrorComponent from '../error-component';
import ProductCard from '../product-card';
import SkeletonCard from '../skeleton-card';
import SectionLabel from './section-label';

const endTime = Date.now() + 5 * 3600 * 24 * 1000;

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
		<div className="flex gap-4 items-center text-pretty">
			{labels.map((label, i) => (
				<Fragment key={label.key}>
					<div key={label.key} className="flex flex-col items-center">
						<span className="text-sm">{label.label}</span>
						<span className="text-3xl font-bold">
							{timer[label.key].toLocaleString('en-US', {
								minimumIntegerDigits: 2
							})}
						</span>
					</div>
					{i < labels.length - 1 && <span className="text-4xl text-skin-secondary-2">:</span>}
				</Fragment>
			))}
		</div>
	);
}

const getProducts = async () => {
	const response = await supabase.from('products').select('*').not('discount', 'eq', 0);
	const data = response.data as Product[] | null;
	return data;
};
const TodaySales = () => {
	const carouselRef = useRef<HTMLDivElement>(null);

	const { t } = useTranslation();

	const {
		data: products,
		isPending,
		isError,
		error
	} = useQuery({
		queryKey: ['products'],
		queryFn: getProducts
	});
	return (
		<section className="py-8 my-10 space-y-10 border-y-2 border-skin-secondary" dir={t('dir')}>
			<div className="container mx-auto space-y-8">
				<SectionLabel title={t('todays.label')} />
				<div className="container flex flex-col gap-4 justify-between items-center mx-auto w-full md:flex-row">
					<h1 className="text-3xl font-semibold">{t('todays.title')}</h1>
					<SaleCountdown />
					<div className="flex gap-2" dir={'ltr'}>
						<button
							className="p-4 rounded-full bg-skin-secondary"
							onClick={() => {
								carouselRef.current?.scrollBy({
									left: -300,
									behavior: 'smooth'
								});
							}}
						>
							<ArrowLeft />
						</button>
						<button
							className="p-4 rounded-full bg-skin-secondary"
							onClick={() => {
								carouselRef.current?.scrollBy({
									left: 300,
									behavior: 'smooth'
								});
							}}
						>
							<ArrowRight />
						</button>
					</div>
				</div>
				<div className="flex justify-center w-full">{isError && <ErrorComponent error={error} />}</div>
				<div ref={carouselRef} className="flex overflow-x-auto gap-4 px-8 py-4">
					{!isError && products && products.map((product) => <ProductCard key={product.id} {...product} />)}
					{isPending && Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
				</div>
				<div className="text-center">
					<Link to="/products">
						<Button variant="default">{t('todays.button')}</Button>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default TodaySales;

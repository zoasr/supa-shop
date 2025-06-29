import { Fragment, useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../product-card';

import ArrowLeft from '@/assets/icons_arrow-left.svg?react';
import ArrowRight from '@/assets/icons_arrow-right.svg?react';
import SectionLabel from './section-label';
import { useTranslation } from 'react-i18next';
import type { Label, Product, Timer } from '@/utils/utils';
import { supabase } from '@/utils/supabase';
import ErrorComponent from '../error-component';
import { Link } from '@tanstack/react-router';
import SkeletonCard from '../skeleton-card';
import { Button } from '$/components/ui/button';

const endTime = new Date().getTime() + 5 * 3600 * 24 * 1000;

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
			const now = new Date().getTime();
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
		<>
			<div className="flex items-center gap-4 text-pretty">
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
		</>
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
		<>
			<section className="my-10 space-y-10 border-y-2 border-skin-secondary py-8" dir={t('dir')}>
				<div className="container mx-auto space-y-8">
					<SectionLabel title={t('todays.label')} />
					<div className="container mx-auto flex w-full flex-col items-center justify-between gap-4 md:flex-row">
						<h1 className="text-3xl font-semibold">{t('todays.title')}</h1>
						<SaleCountdown />
						<div className="flex gap-2" dir={'ltr'}>
							<button
								className="rounded-full bg-skin-secondary p-4"
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
								className="rounded-full bg-skin-secondary p-4"
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
					<div className="flex w-full justify-center">{isError && <ErrorComponent error={error} />}</div>
					<div ref={carouselRef} className="flex gap-4 overflow-x-auto px-8 py-4">
						{!isError &&
							products &&
							products.map((product) => <ProductCard key={product.id} {...product} />)}
						{isPending && Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
					</div>
					<div className="text-center">
						<Link to="/products">
							<Button variant="default">{t('todays.button')}</Button>
						</Link>
					</div>
				</div>
			</section>
		</>
	);
};

export default TodaySales;

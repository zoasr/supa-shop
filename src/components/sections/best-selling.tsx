import { Button } from '$/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ArrowLeft from '@/assets/icons_arrow-left.svg?react';
import ArrowRight from '@/assets/icons_arrow-right.svg?react';
import { supabase } from '@/utils/supabase';
import type { Product } from '@/utils/utils';
import ErrorComponent from '../error-component';
import ProductCard from '../product-card';
import SkeletonCard from '../skeleton-card';
import SectionLabel from './section-label';

const getProducts = async () => {
	const response = (await supabase.from('products').select('*').lt('price', 200)) as { data: Product[] | null };

	return response.data;
};
const BestSelling = () => {
	const carouselRef = useRef<HTMLDivElement>(null);
	const { t } = useTranslation();

	const {
		data: products,
		isError,
		isPending,
		error
	} = useQuery({
		queryKey: ['products'],
		queryFn: getProducts
	});

	return (
		<section className="my-10 border-b-2 border-solid border-skin-secondary" dir={t('dir')}>
			<div className="container mx-auto">
				<SectionLabel title={t('best-selling.label')} />
				<div className="flex flex-col gap-4 justify-between items-center w-full md:flex-row">
					<h1 className="text-5xl font-medium">{t('best-selling.title')}</h1>
					<div className="flex gap-2" dir={'ltr'}>
						<button
							className="p-4 rounded-full bg-skin-secondary"
							onClick={() => {
								carouselRef.current?.scrollBy({
									left: -200,
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
									left: 200,
									behavior: 'smooth'
								});
							}}
						>
							<ArrowRight />
						</button>
					</div>
					<div className="text-center">
						<Link to="/products">
							<Button variant="default">{t('best-selling.button')}</Button>
						</Link>
					</div>
				</div>
				<div ref={carouselRef} className="flex overflow-x-auto gap-4 py-4 my-4">
					{isPending &&
						// <Loader className="animate-spin size-20" />
						Array.from({ length: 4 }).map((_, i) => {
							return <SkeletonCard key={i} />;
						})}
					{isError && <ErrorComponent error={error} />}
					{!isError &&
						!isPending &&
						products &&
						products.map((product) => <ProductCard key={product.id} {...product} />)}
				</div>
			</div>
		</section>
	);
};

export default BestSelling;

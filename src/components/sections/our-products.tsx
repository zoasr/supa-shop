import { Button } from '$/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/utils/supabase';
import type { Product } from '@/utils/utils';
import ErrorComponent from '../error-component';
import ProductCard from '../product-card';
import SkeletonCard from '../skeleton-card';
import SectionLabel from './section-label';

const getProducts = async () => {
	const response = (await supabase.from('products').select('*').limit(6)) as {
		data: Product[] | null;
	};
	return response.data;
};
const OurProducts = () => {
	const { data: products, isError, isPending, error } = useQuery({ queryKey: ['products'], queryFn: getProducts });
	const { t } = useTranslation();

	return (
		<section dir={t('dir')}>
			<div className="container mx-auto my-8 space-y-8 border-y-2 border-skin-secondary py-8">
				<SectionLabel title={t('products.label')} />
				<div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
					<h1 className="text-3xl font-semibold">{t('products.title')}</h1>
				</div>
				<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] place-items-center gap-4">
					{isError && <ErrorComponent error={error} />}
					{isPending && Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
					{products &&
						!isError &&
						!isPending &&
						products.map((product) => <ProductCard key={product.id} {...product} />)}
				</div>
				<div className="text-center">
					<Link
						to="/products"
						viewTransition={{
							types: ['slide-left']
						}}
					>
						<Button variant="default">{t('products.button')}</Button>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default OurProducts;

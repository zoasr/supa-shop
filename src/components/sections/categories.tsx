import { Link } from '@tanstack/react-router';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import CategoryCamera from '@/assets/Category-Camera.svg?react';
import CategoryCellPhone from '@/assets/Category-CellPhone.svg?react';
import CategoryComputer from '@/assets/Category-Computer.svg?react';
import CategoryGamepad from '@/assets/Category-Gamepad.svg?react';
import CategoryHeadphone from '@/assets/Category-Headphone.svg?react';
import CategorySmartWatch from '@/assets/Category-SmartWatch.svg?react';
import ArrowLeft from '@/assets/icons_arrow-left.svg?react';
import ArrowRight from '@/assets/icons_arrow-right.svg?react';
import SectionLabel from './section-label';

const Category = ({ label, component: Component }: { label: string; component: React.ElementType }) => {
	return (
		<div className="flex flex-col gap-4 items-center px-14 py-4 text-center bg-transparent rounded-lg ring-2 transition-all duration-75 cursor-pointer group ring-black/30 hover:bg-skin-secondary-2 hover:text-skin-text hover:ring-0">
			<Component />
			<p className="text-xl font-medium">{label}</p>
		</div>
	);
};
const Categories = () => {
	const carouselRef = useRef<HTMLDivElement>(null);
	const { t } = useTranslation();
	const categories = [
		{
			label: t('categories.phones'),
			category: 'Phones',
			component: CategoryCellPhone
		},
		{
			label: t('categories.gaming'),
			category: 'Gaming',
			component: CategoryGamepad
		},
		{
			label: t('categories.camera'),
			category: 'Camera',
			component: CategoryCamera
		},
		{
			label: t('categories.computers'),
			category: 'Computers',
			component: CategoryComputer
		},
		{
			label: t('categories.headphones'),
			category: 'Headphones',
			component: CategoryHeadphone
		},
		{
			label: t('categories.watches'),
			category: 'Watches',
			component: CategorySmartWatch
		}
	];
	return (
		<section className="my-10 border-b-2 border-solid border-skin-secondary" dir={t('dir')}>
			<div className="container mx-auto">
				<SectionLabel title={t('categories.label')} />
				<div className="flex flex-col gap-4 justify-between items-center w-full md:flex-row">
					<h1 className="text-5xl font-medium">{t('categories.title')}</h1>
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
				</div>
				<div ref={carouselRef} className="flex overflow-x-auto overflow-y-visible gap-4 p-4 my-8">
					{categories.map((category) => (
						<Link key={category.category} to="/products" search={{ category: category.category }}>
							<Category {...category} />
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default Categories;

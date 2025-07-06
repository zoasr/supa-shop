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
		<div className="group flex cursor-pointer flex-col items-center gap-4 rounded-lg bg-transparent px-14 py-4 text-center ring-2 ring-black/30 transition-all duration-75 hover:bg-skin-secondary-2 hover:text-skin-text hover:ring-0">
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
			component: CategoryCellPhone
		},
		{
			label: t('categories.gaming'),
			component: CategoryGamepad
		},
		{
			label: t('categories.camera'),
			component: CategoryCamera
		},
		{
			label: t('categories.computers'),
			component: CategoryComputer
		},
		{
			label: t('categories.headphones'),
			component: CategoryHeadphone
		},
		{
			label: t('categories.watches'),
			component: CategorySmartWatch
		}
	];
	return (
		<section className="my-10 border-b-2 border-solid border-skin-secondary" dir={t('dir')}>
			<div className="container mx-auto">
				<SectionLabel title={t('categories.label')} />
				<div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
					<h1 className="text-5xl font-medium">{t('categories.title')}</h1>
					<div className="flex gap-2" dir={'ltr'}>
						<button
							className="rounded-full bg-skin-secondary p-4"
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
							className="rounded-full bg-skin-secondary p-4"
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
				<div ref={carouselRef} className="my-8 flex gap-4 overflow-x-auto overflow-y-visible p-4">
					{categories.map((category) => (
						<Category key={category.label} {...category} />
					))}
				</div>
			</div>
		</section>
	);
};

export default Categories;

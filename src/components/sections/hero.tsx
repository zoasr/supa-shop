import { cn } from '$/lib/utils';
import { Icon } from '@iconify-icon/react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import appleLogo from '@/assets/apple-logo.svg';
import heroImage from '@/assets/hero-image.png';

type CategoryRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const Category = ({ label, dir }: { label: string; dir: 'ltr' | 'rtl' }) => {
	return (
		<li className="flex gap-2 items-center transition-all duration-75 hover:border-b-2 hover:border-skin-secondary">
			<Link to="#">{label}</Link>
			{dir === 'rtl' ? <Icon icon="radix-icons:caret-left" /> : <Icon icon="radix-icons:caret-right" />}
		</li>
	);
};

const Hero = () => {
	const { t } = useTranslation();
	return (
		<section className="mb-10" dir={t('dir')}>
			<div className="container flex flex-col gap-8 justify-between md:flex-row">
				<aside
					className={cn('border-b-2 border-skin-secondary px-8 md:border-b-0', {
						'md:border-l-2': t('dir') === 'rtl',
						'md:border-r-2': t('dir') === 'ltr'
					})}
				>
					<ul className="flex overflow-auto flex-row gap-4 justify-start items-center px-8 py-8 text-nowrap md:flex-col md:items-start">
						{Array.from({ length: 9 }).map((_, index) => (
							<Category
								key={index}
								dir={t('dir') as 'ltr' | 'rtl'}
								label={t(`hero.categories.category-${(index + 1) as CategoryRange}`)}
							/>
						))}
					</ul>
				</aside>
				<div
					className="mt-8 flex max-w-[900px] flex-col items-center justify-center gap-8 bg-black px-10 py-10 md:max-h-[350px] md:flex-row md:py-0"
					dir="ltr"
				>
					<div className="flex flex-col flex-1 gap-8 justify-start text-white">
						<div className="flex gap-4 items-center font-poppins">
							<img src={appleLogo} alt="" />
							<h1>iPhone 14 series</h1>
						</div>
						<h1 className="text-5xl font-poppins">Up to 10% off Voucher</h1>
						<button className="flex items-center text-white">
							<span className="transition-all duration-75 hover:border-b-2">Shop Now</span>
							<Icon icon="formkit:arrowright" />
						</button>
					</div>
					<div>
						<img src={heroImage} alt="hero" className="object-cover w-full h-full" />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;

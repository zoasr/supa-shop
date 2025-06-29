import BestSelling from '@/components/sections/best-selling';
import Categories from '@/components/sections/categories';
import Featured from '@/components/sections/featured';
import Hero from '@/components/sections/hero';
import OurProducts from '@/components/sections/our-products';
import SaleCallout from '@/components/sections/sale-callout';
import Services from '@/components/sections/services';
import TodaySales from '@/components/sections/today-sales';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
	component: Index
});

function Index() {
	return (
		<>
			<Hero />
			<TodaySales />
			<Categories />
			<BestSelling />
			<SaleCallout />
			<OurProducts />
			<Featured />
			<Services />
		</>
	);
}

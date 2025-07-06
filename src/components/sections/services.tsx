import servicesSupport from '@/assets/services-customer-service.svg';
import servicesDelivery from '@/assets/services-delivery.svg';
import servicesMoneyBack from '@/assets/services-money-back.svg';

const Services = () => {
	return (
		<section className="my-24">
			<div className="container mx-auto flex flex-col items-center justify-center gap-8 text-center md:flex-row">
				<div className="flex flex-col items-center justify-center font-poppins">
					<img src={servicesDelivery} alt={'servicesDelivery'} />
					<h2 className="text-2xl font-semibold uppercase">free and fast delivery</h2>
					<p>Free delivery for all orders over $140</p>
				</div>
				<div className="flex flex-col items-center justify-center font-poppins">
					<img src={servicesSupport} alt={'servicesSupport'} />
					<h2 className="text-2xl font-semibold uppercase">24/7 CUSTOMER SERVICE</h2>
					<p>Friendly 24/7 customer support</p>
				</div>
				<div className="flex flex-col items-center justify-center font-poppins">
					<img src={servicesMoneyBack} alt={'servicesDelivery'} />
					<h2 className="text-2xl font-semibold uppercase">MONEY BACK GUARANTEE</h2>
					<p>We return money within 30 days</p>
				</div>
			</div>
		</section>
	);
};

export default Services;

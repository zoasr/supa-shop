import { Button } from '$/components/ui/button';
import { Textarea } from '$/components/ui/textarea';
import MailIcon from '@/assets/icon-mail.svg?react';
import PhoneIcon from '@/assets/icon-phone.svg?react';
import { FormInput } from '@/components/form-input';
import { createLazyFileRoute } from '@tanstack/react-router';
const Page = () => {
	return (
		<div className="container mx-auto grid gap-4 grid-cols-1 md:grid-cols-[repeat(auto-fit,340px_minmax(340px,auto))]">
			<aside className="grid  gap-8 p-10 text-skin-text-2 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-sm">
				<section className="space-y-4">
					<h1 className="flex gap-4 items-center text-lg font-semibold">
						<span className="p-2 text-white rounded-full bg-skin-secondary-2">
							<PhoneIcon />
						</span>{' '}
						Call us
					</h1>
					<p>We are available 24/7, 7 days a week.</p>
					<p>Phone: +8801611112222</p>
				</section>
				<hr />
				<section className="space-y-4 font-normal">
					<h1 className="flex gap-4 items-center text-lg font-semibold">
						<span className="p-2 text-white rounded-full bg-skin-secondary-2">
							<MailIcon className="w-6 h-6" />
						</span>{' '}
						Write Us
					</h1>
					<p>Fill out our form and we will contact you within 24 hours.</p>
					<p>Emails: customer@exclusive.com</p>
					<p>Emails: support@exclusive.com</p>
				</section>
			</aside>
			<main className="@container p-10 text-skin-text-2 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-sm">
				<form className="grid grid-cols-3 grid-rows-5 gap-8">
					<FormInput
						required
						type="text"
						className="col-span-3 @sm:col-span-3 @md:col-span-1"
						name="name"
						placeholder="Your Name"
					/>
					<FormInput
						required
						type="email"
						className="col-span-3 @md:col-span-1"
						name="email"
						placeholder="Your Email"
					/>
					<FormInput
						required
						type="phone"
						className="col-span-3 @md:col-span-1"
						pattern="\+?[0-9]{1,4}?[-.\s]?(\(?\d{1,3}?\)|\d{1,4})[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
						name="phone"
						placeholder="Your Phone"
					/>
					<Textarea
						className="col-span-3 px-4 py-3 w-full h-auto rounded-md border-0 @md:row-span-3 bg-skin-secondary focus-visible:ring-skin-secondary-2"
						name="message"
						placeholder="Your Message"
					></Textarea>
					<Button
						className="@lg:col-start-3 @lg:col-span-1 @sm:col-start-2 @sm:col-span-2 cols-start-1 row-start-5 col-span-3 "
						type="submit"
					>
						Send Message
					</Button>
				</form>
			</main>
		</div>
	);
};
export const Route = createLazyFileRoute('/contact')({
	component: Page
});

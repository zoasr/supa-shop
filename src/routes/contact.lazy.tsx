import { Button } from '$/components/ui/button';
import { Textarea } from '$/components/ui/textarea';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import MailIcon from '@/assets/icon-mail.svg?react';
import PhoneIcon from '@/assets/icon-phone.svg?react';
import { FormInput } from '@/components/form-input';

const Page = () => {
	const { t } = useTranslation();
	return (
		<div className="container mx-auto grid gap-4 grid-cols-1 md:grid-cols-[repeat(auto-fit,340px_minmax(340px,auto))]">
			<aside className="grid gap-8 h-min sm:p-10 text-skin-text-2 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-sm">
				<section className="space-y-4">
					<h1 className="flex gap-4 items-center text-lg font-semibold">
						<span className="p-2 text-white rounded-full bg-skin-secondary-2">
							<PhoneIcon />
						</span>{' '}
						{t('contactPage.aside.callus')}
					</h1>
					<p>{t('contactPage.aside.details')}</p>
					<p>{t('contactPage.aside.phone')}</p>
				</section>
				<hr />
				<section className="space-y-4 font-normal">
					<h1 className="flex gap-4 items-center text-lg font-semibold">
						<span className="p-2 text-white rounded-full bg-skin-secondary-2">
							<MailIcon className="w-6 h-6" />
						</span>{' '}
						{t('contactPage.aside.writeus')}
					</h1>
					<p>{t('contactPage.aside.writeusdetails')}</p>
					<p>{t('contactPage.aside.emails')}</p>
				</section>
			</aside>
			<main className="@container sm:p-10 text-skin-text-2 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-sm">
				<form className="h-full grid grid-cols-3 grid-rows-[min-content_repeat(3,minmax(0,auto))_min-content] gap-8">
					<FormInput
						required
						type="text"
						className="col-span-3 @sm:col-span-3 @md:col-span-1"
						name="name"
						placeholder={t('contactPage.main.form.name')}
					/>
					<FormInput
						required
						type="email"
						className="col-span-3 @md:col-span-1"
						name="email"
						placeholder={t('contactPage.main.form.email')}
					/>
					<FormInput
						required
						type="phone"
						className="col-span-3 @md:col-span-1"
						pattern="\+?[0-9]{1,4}?[-.\s]?(\(?\d{1,3}?\)|\d{1,4})[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
						name="phone"
						placeholder={t('contactPage.main.form.phone')}
					/>
					<Textarea
						className="col-span-3 px-4 py-3 w-full h-auto rounded-md border-0 @md:row-span-3 bg-skin-secondary dark:bg-skin-secondary focus-visible:ring-skin-secondary-2"
						name="message"
						placeholder={t('contactPage.main.form.message')}
					></Textarea>
					<Button
						className="@lg:col-start-3 @lg:col-span-1 @sm:col-start-2 @sm:col-span-2 max-h-fit self-end cols-start-1 row-start-5 col-span-3 "
						type="submit"
					>
						{t('contactPage.main.form.buttons.send')}
					</Button>
				</form>
			</main>
		</div>
	);
};
export const Route = createLazyFileRoute('/contact')({
	component: Page
});

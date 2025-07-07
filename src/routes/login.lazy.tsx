import { Button } from '$/components/ui/button';
import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import googleSignupImage from '@/assets/icon-google.svg';
import sideImage from '@/assets/side-image.png';
import { supabase } from '@/utils/supabase';

const Login = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [error, setError] = useState<Error | null>(null);
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const formObj = Object.fromEntries(formData.entries()) as {
			email: string;
			password: string;
		};
		const { data, error } = await supabase.auth.signInWithPassword(formObj);
		if (error) {
			console.log(error);
			setError(error);
		}
		if (data.session) {
			navigate({
				to: '/account'
			});
		}
	};

	const handleOAuth = async () => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'google'
		});
		if (error) {
			console.log(error);
			setError(error);
		}
	};
	return (
		<main className="my-10 flex max-w-[1400px] flex-col-reverse justify-between gap-4 px-8 lg:flex-row">
			<div className="h-[100%] w-full lg:w-1/2">
				<img src={sideImage} alt="side-image" className="h-[100%] w-[100%] object-cover" />
			</div>
			<form className="flex flex-col gap-4 justify-center px-8 w-full lg:w-1/2" onSubmit={handleSubmit}>
				<h1 className="text-4xl font-medium">{t('loginPage.title')}</h1>
				<p>{t('loginPage.details')}</p>
				<input
					className="py-4 rounded-b-md border-b-2 transition-all duration-75 outline-none focus-visible:border-b-4"
					type="email"
					placeholder={t('loginPage.email')}
					required
					name="email"
				/>
				<input
					className="py-4 rounded-b-md border-b-2 transition-all duration-75 outline-none focus-visible:border-b-4"
					type="password"
					placeholder={t('loginPage.password')}
					required
					name="password"
				/>
				{error && <p className="text-center text-red-500 sm:text-left">{error.message}</p>}
				<Button type="submit">{t('loginPage.buttons.login')}</Button>
				<Button type="button" onClick={handleOAuth} variant={'outline'}>
					<img src={googleSignupImage} alt="" />
					{t('loginPage.buttons.google')}
				</Button>
				<p className="text-center">
					{t('loginPage.nologin')}{' '}
					<Link to="/signup" className="font-bold underline">
						{t('loginPage.buttons.signup')}
					</Link>{' '}
				</p>
			</form>
		</main>
	);
};

export const Route = createLazyFileRoute('/login')({
	component: Login
});

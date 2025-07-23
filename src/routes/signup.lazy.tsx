import { Button } from '$/components/ui/button';
import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import googleSignupImage from '@/assets/icon-google.svg';
import sideImage from '@/assets/side-image.png';
import { supabase } from '@/utils/supabase';

const Signup = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [error, setError] = useState<Error | null>(null);
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const formObj = Object.fromEntries(formData.entries()) as {
			name: string;
			email: string;
			password: string;
		};
		const { data, error } = await supabase.auth.signUp({
			email: formObj.email,
			password: formObj.password,
			options: {
				data: {
					name: formObj.name
				}
			}
		});
		if (error) {
			console.log(error);
			setError(error);
		}
		if (data) {
			navigate({
				to: '/account'
			});
		}
	};

	const handleOAuth = async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google'
		});
		if (error) {
			console.log(error);
			setError(error);
		}
		if (data) {
			navigate({
				to: '/account'
			});
		}
	};
	return (
		<section
			aria-labelledby="signup-title"
			className="my-10 flex max-w-[1400px] flex-col-reverse justify-between gap-8  md:flex-row"
		>
			<img src={sideImage} alt="side-image" />
			<form className="flex flex-col gap-4 justify-center" onSubmit={handleSubmit}>
				<h1 id="signup-title" className="text-4xl font-medium">
					{t('signupPage.title')}
				</h1>
				<p>{t('signupPage.details')}</p>
				<input
					className="py-4 rounded-b-md border-b-2 transition-all duration-75 outline-none focus-visible:border-b-4"
					type="text"
					placeholder={t('signupPage.name')}
					required
					name="name"
				/>
				<input
					className="py-4 rounded-b-md border-b-2 transition-all duration-75 outline-none focus-visible:border-b-4"
					type="email"
					placeholder={t('signupPage.email')}
					required
					name="email"
				/>
				<input
					className="py-4 rounded-b-md border-b-2 transition-all duration-75 outline-none focus-visible:border-b-4"
					type="password"
					placeholder={t('signupPage.password')}
					required
					name="password"
				/>
				{error && <p className="font-bold text-red-500">{error.message}</p>}
				<Button type="submit">{t('signupPage.buttons.signup')}</Button>
				<Button type="button" onClick={handleOAuth} variant={'outline'}>
					<img src={googleSignupImage} alt="" />
					{t('signupPage.buttons.google')}
				</Button>
				<p className="text-center">
					{t('signupPage.already')}{' '}
					<Link to="/login" className="font-bold underline">
						{t('signupPage.buttons.login')}
					</Link>{' '}
				</p>
			</form>
		</section>
	);
};
export const Route = createLazyFileRoute('/signup')({
	component: Signup
});

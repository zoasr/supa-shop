import { Link, createLazyFileRoute, redirect } from '@tanstack/react-router';

import sideImage from '@/assets/side-image.png';

import googleSignupImage from '@/assets/icon-google.svg';

import { supabase } from '@/utils/supabase';
import { useState } from 'react';

const Signup = () => {
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
			redirect({
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
			redirect({
				to: '/account'
			});
		}
	};
	return (
		<>
			<main className="my-10 flex max-w-[1400px] flex-col-reverse justify-between gap-8 px-8 md:flex-row">
				<img src={sideImage} alt="side-image" />
				<form className="flex flex-col justify-center gap-4 px-8" onSubmit={handleSubmit}>
					<h1 className="text-4xl font-medium">Create an account</h1>
					<p>Enter your details below</p>
					<input
						className="rounded-b-md border-b-2 py-4 transition-all duration-75 outline-none focus-visible:border-b-4"
						type="text"
						placeholder="Name"
						required
						name="name"
					/>
					<input
						className="rounded-b-md border-b-2 py-4 transition-all duration-75 outline-none focus-visible:border-b-4"
						type="email"
						placeholder="Email"
						required
						name="email"
					/>
					<input
						className="rounded-b-md border-b-2 py-4 transition-all duration-75 outline-none focus-visible:border-b-4"
						type="password"
						placeholder="Password"
						required
						name="password"
					/>
					{error && <p className="font-bold text-red-500">{error.message}</p>}
					<button
						type="submit"
						className="rounded-md bg-skin-secondary-2 px-8 py-4 text-skin-text transition-all hover:opacity-80 focus-visible:opacity-80"
					>
						Create Account
					</button>
					<button
						onClick={handleOAuth}
						className="flex items-center justify-center gap-4 rounded-md bg-transparent px-8 py-4 text-black ring-2 ring-black/40 transition-all hover:opacity-80 focus-visible:opacity-80"
					>
						<img src={googleSignupImage} alt="" />
						Sign up with Google
					</button>
					<p className="text-center">
						Already have an account?{' '}
						<Link to="/login" className="font-bold underline">
							Login
						</Link>{' '}
					</p>
				</form>
			</main>
		</>
	);
};
export const Route = createLazyFileRoute('/signup')({
	component: Signup
});

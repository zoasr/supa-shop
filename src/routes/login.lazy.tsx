import { supabase } from '@/utils/supabase';
import { Link, createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import sideImage from '@/assets/side-image.png';

import googleSignupImage from '@/assets/icon-google.svg';

const Login = () => {
	const navigate = useNavigate();
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
		}
		if (data) {
			navigate({
				to: '/'
			});
		}
	};

	const handleOAuth = async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google'
		});
		if (error) {
			console.log(error);
		}
		if (data) {
			console.log(data);
		}
	};
	return (
		<>
			<main className="my-10 flex max-w-[1400px] flex-col-reverse justify-between gap-4 px-8 lg:flex-row">
				<div className="h-[100%] w-full lg:w-1/2">
					<img src={sideImage} alt="side-image" className="h-[100%] w-[100%] object-cover" />
				</div>
				<form className="flex w-full flex-col justify-center gap-4 px-8 lg:w-1/2" onSubmit={handleSubmit}>
					<h1 className="text-4xl font-medium">Log in to Exclusive</h1>
					<p>Enter your details below</p>
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
					<button
						type="submit"
						className="rounded-lg bg-skin-secondary-2 px-8 py-4 text-skin-text transition-all hover:opacity-80 focus-visible:opacity-80"
					>
						Login
					</button>
					<button
						onClick={handleOAuth}
						className="flex items-center justify-center gap-4 rounded-md bg-transparent px-8 py-4 text-black ring-2 ring-black/40 transition-all hover:opacity-80 focus-visible:opacity-80"
					>
						<img src={googleSignupImage} alt="" />
						Sign in with Google
					</button>
					<p className="text-center">
						Don't have an account?{' '}
						<Link to="/signup" className="font-bold underline">
							Signup
						</Link>{' '}
					</p>
				</form>
			</main>
		</>
	);
};

export const Route = createLazyFileRoute('/login')({
	component: Login
});

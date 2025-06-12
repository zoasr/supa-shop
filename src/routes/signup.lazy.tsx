import { Link, createLazyFileRoute } from "@tanstack/react-router";

import sideImage from "@/assets/side-image.png";

import googleSignupImage from "@/assets/icon-google.svg";

import { supabase } from "@/utils/supabase";

const Signup = () => {
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
					name: formObj.name,
				},
			},
		});
		if (error) {
			console.log(error);
		}
		if (data) {
			console.log(data);
		}
	};

	const handleOAuth = async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "google",
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
			<main className="flex flex-col-reverse gap-8 max-w-[1400px] justify-between px-8 my-10 md:flex-row">
				<img src={sideImage} alt="side-image" />
				<form
					className="flex flex-col gap-4 justify-center px-8"
					onSubmit={handleSubmit}
				>
					<h1 className="text-4xl font-medium">Create an account</h1>
					<p>Enter your details below</p>
					<input
						className="py-4 rounded-b-md border-b-2 transition-all duration-75 outline-none focus-visible:border-b-4"
						type="text"
						placeholder="Name"
						required
						name="name"
					/>
					<input
						className="py-4 rounded-b-md border-b-2 transition-all duration-75 outline-none focus-visible:border-b-4"
						type="email"
						placeholder="Email"
						required
						name="email"
					/>
					<input
						className="py-4 rounded-b-md border-b-2 transition-all duration-75 outline-none focus-visible:border-b-4"
						type="password"
						placeholder="Password"
						required
						name="password"
					/>
					<button
						type="submit"
						className="px-8 py-4 rounded-md transition-all bg-skin-secondary-2 text-skin-text hover:opacity-80 focus-visible:opacity-80"
					>
						Create Account
					</button>
					<button
						onClick={handleOAuth}
						className="flex gap-4 justify-center items-center px-8 py-4 text-black bg-transparent rounded-md ring-2 transition-all ring-black/40 hover:opacity-80 focus-visible:opacity-80"
					>
						<img src={googleSignupImage} alt="" />
						Sign up with Google
					</button>
					<p className="text-center">
						Already have an account?{" "}
						<Link to="/login" className="font-bold underline">
							Login
						</Link>{" "}
					</p>
				</form>
			</main>
		</>
	);
};
export const Route = createLazyFileRoute("/signup")({
	component: Signup,
});

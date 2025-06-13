import { supabase } from "@/utils/supabase";
import { Link, createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import sideImage from "@/assets/side-image.png";

import googleSignupImage from "@/assets/icon-google.svg";

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
				to: "/",
			});
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
			<main className="flex flex-col-reverse gap-4 max-w-[1400px] justify-between px-8 my-10 lg:flex-row">
				<div className="lg:w-1/2 w-full h-[100%]">
					<img
						src={sideImage}
						alt="side-image"
						className="w-[100%] h-[100%] object-cover"
					/>
				</div>
				<form
					className="flex flex-col gap-4 justify-center px-8 lg:w-1/2 w-full"
					onSubmit={handleSubmit}
				>
					<h1 className="text-4xl font-medium">
						Log in to Exclusive
					</h1>
					<p>Enter your details below</p>
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
						className="px-8 py-4 rounded-lg transition-all bg-skin-secondary-2 text-skin-text hover:opacity-80 focus-visible:opacity-80"
					>
						Login
					</button>
					<button
						onClick={handleOAuth}
						className="flex gap-4 justify-center items-center px-8 py-4 text-black bg-transparent rounded-md ring-2 transition-all ring-black/40 hover:opacity-80 focus-visible:opacity-80"
					>
						<img src={googleSignupImage} alt="" />
						Sign in with Google
					</button>
					<p className="text-center">
						Don't have an account?{" "}
						<Link to="/signup" className="font-bold underline">
							Signup
						</Link>{" "}
					</p>
				</form>
			</main>
		</>
	);
};

export const Route = createLazyFileRoute("/login")({
	component: Login,
});

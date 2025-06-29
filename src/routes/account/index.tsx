import { isLoggedIn } from '@/utils/supabase';
import { createFileRoute, Link, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/account/')({
	beforeLoad: async () => {
		const loggedIn = await isLoggedIn();
		if (!loggedIn || loggedIn instanceof Error) {
			throw redirect({
				to: '/login'
			});
		}
	},
	component: () => {
		return (
			<div className="container mx-auto p-4">
				<h1 className="mb-6 text-3xl font-bold">Account Management</h1>
				<div className="flex flex-col gap-6 md:flex-row">
					<aside className="w-full md:w-1/4">
						<nav>
							<ul>
								<h1 className="text-left text-base font-medium text-skin-text-2">Manage My Account</h1>
								<li className="mb-2 ml-9 text-skin-text-2/50">
									<Link to="/account" className="hover:underline [&.active]:text-skin-secondary-2">
										My Profile
									</Link>
								</li>
								<li className="mb-2 ml-9 text-skin-text-2/50">
									<a
										href="/account/orders"
										className="hover:underline [&.active]:text-skin-secondary-2"
									>
										Orders
									</a>
								</li>
								<h1 className="text-left text-base font-medium text-skin-text-2">My Wishlist</h1>
								<li className="mb-2 ml-9 text-skin-text-2/50">
									<a
										href="/account/wishlist"
										className="hover:underline [&.active]:text-skin-secondary-2"
									>
										Wishlist
									</a>
								</li>
								<li className="mb-2 ml-9 text-skin-text-2/50">
									<a
										href="/account/reviews"
										className="hover:underline [&.active]:text-skin-secondary-2"
									>
										Reviews
									</a>
								</li>
							</ul>
						</nav>
					</aside>
					<main className="w-full max-w-4xl rounded-lg bg-skin-primary p-8 shadow-md">
						<h2 className="mb-6 text-2xl font-medium text-skin-secondary-2">Edit Your Profile</h2>

						<form className="space-y-6">
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								<div className="col-span-2 md:col-span-1">
									<label
										htmlFor="firstName"
										className="mb-1 block text-sm font-medium text-skin-text-2"
									>
										First Name
									</label>
									<input
										type="text"
										id="firstName"
										placeholder="Md"
										className="w-full rounded-md bg-skin-secondary px-4 py-3 text-skin-text-2/50 focus:border-transparent focus:text-skin-text-2 focus:ring-2 focus:ring-skin-secondary-2"
									/>
								</div>
								<div className="col-span-2 md:col-span-1">
									<label
										htmlFor="lastName"
										className="mb-1 block text-sm font-medium text-skin-text-2"
									>
										Last Name
									</label>
									<input
										type="text"
										id="lastName"
										placeholder="Rimel"
										className="w-full rounded-md bg-skin-secondary px-4 py-3 text-skin-text-2/50 focus:border-transparent focus:text-skin-text-2 focus:ring-2 focus:ring-skin-secondary-2"
									/>
								</div>
								<div className="col-span-2 md:col-span-1">
									<label htmlFor="email" className="mb-1 block text-sm font-medium text-skin-text-2">
										Email
									</label>
									<input
										type="email"
										id="email"
										placeholder="rimell111@gmail.com"
										className="w-full rounded-md bg-skin-secondary px-4 py-3 text-skin-text-2/50 focus:border-transparent focus:text-skin-text-2 focus:ring-2 focus:ring-skin-secondary-2"
									/>
								</div>
								<div className="col-span-2 md:col-span-1">
									<label
										htmlFor="address"
										className="mb-1 block text-sm font-medium text-skin-text-2"
									>
										Address
									</label>
									<input
										type="text"
										id="address"
										placeholder="Kingston, 5236, United State"
										className="w-full rounded-md bg-skin-secondary px-4 py-3 text-skin-text-2/50 focus:border-transparent focus:text-skin-text-2 focus:ring-2 focus:ring-skin-secondary-2"
									/>
								</div>
							</div>

							<div className="pt-6">
								<h3 className="mb-4 font-medium text-skin-text-2">Password Changes</h3>
								<div className="space-y-4">
									<div>
										<input
											type="password"
											id="currentPassword"
											placeholder="Current Password"
											className="w-full rounded-md bg-skin-secondary px-4 py-3 text-skin-text-2/50 focus:border-transparent focus:text-skin-text-2 focus:ring-2 focus:ring-skin-secondary-2"
										/>
									</div>
									<div>
										<input
											type="password"
											id="newPassword"
											placeholder="New Password"
											className="w-full rounded-md bg-skin-secondary px-4 py-3 text-skin-text-2/50 focus:border-transparent focus:text-skin-text-2 focus:ring-2 focus:ring-skin-secondary-2"
										/>
									</div>
									<div>
										<input
											type="password"
											id="confirmPassword"
											placeholder="Confirm New Password"
											className="w-full rounded-md bg-skin-secondary px-4 py-3 text-skin-text-2/50 focus:border-transparent focus:text-skin-text-2 focus:ring-2 focus:ring-skin-secondary-2"
										/>
									</div>
								</div>
							</div>

							<div className="flex justify-end space-x-4 pt-6">
								<button
									type="button"
									className="rounded-sm px-6 py-3 text-skin-text-2 hover:bg-skin-button-2/20 focus:ring-2 focus:ring-skin-secondary-2 focus:ring-offset-2 focus:outline-none"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="rounded-sm border border-transparent bg-skin-button-2 px-12 py-3 text-skin-text transition-all duration-75 hover:bg-skin-button-2/80 focus:ring-2 focus:ring-skin-secondary-2 focus:ring-offset-2 focus:outline-none"
								>
									Save Changes
								</button>
							</div>
						</form>
					</main>
				</div>
			</div>
		);
	}
});

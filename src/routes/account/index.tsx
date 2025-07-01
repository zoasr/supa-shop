import { getUser, isLoggedIn } from '@/utils/supabase';
import { createFileRoute, Link, redirect, useLoaderData } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Input } from '$/components/ui/input';
import { cn } from '$/lib/utils';

const FormInput = ({ className, ...props }: React.ComponentProps<typeof Input>) => {
	return (
		<Input
			className={cn(
				'h-auto w-full rounded-md border-0 bg-skin-secondary px-4 py-3 text-skin-text-2/50 selection:bg-skin-secondary-2 placeholder:text-skin-text-2/30 focus:border-transparent focus:text-skin-text-2 focus:ring-2 focus:ring-skin-secondary-2',
				className
			)}
			{...props}
		/>
	);
};

export const Route = createFileRoute('/account/')({
	beforeLoad: async () => {
		const loggedIn = await isLoggedIn();
		if (!loggedIn || loggedIn instanceof Error) {
			throw redirect({
				to: '/login'
			});
		}
	},
	loader: async () => {
		const user = await getUser();
		if (user instanceof Error) {
			throw redirect({
				to: '/login'
			});
		}
		return {
			user: user.user_metadata,
			isOAuth: user instanceof Error || user.identities?.[0]?.provider !== 'email' || false
		};
	},

	component: () => {
		const { user, isOAuth } = useLoaderData({ from: '/account/' });
		const form = useForm({
			defaultValues: {
				firstName: (user.full_name?.split(' ')[0] || user.name || 'name') as string,
				lastName: (user.full_name?.split(' ')[1] || '') as string,
				email: user.email as string,
				address: '',
				currPass: '',
				newPass: '',
				confirmNewPass: ''
			},
			validators: {
				onChange: z
					.object({
						firstName: z.string().min(1),
						lastName: z.union([z.string(), z.literal('')]),
						email: z.string().email(),
						address: z.string().optional(),
						currPass: z.string().superRefine((val, ctx) => {
							if (val !== '' && val.length < 6) {
								ctx.addIssue({
									code: 'custom',
									message: 'Password must be at least 6 characters long'
								});
							}
						}),
						newPass: z.string().optional(),
						confirmNewPass: z.string().optional()
					})
					.superRefine((data, ctx) => {
						if (data.currPass && data.newPass && data.newPass?.length < 6 && !data.newPass) {
							ctx.addIssue({
								path: ['newPass'],
								code: 'custom',
								message: 'Please enter a new password'
							});
						}
						if (data.newPass !== data.confirmNewPass) {
							ctx.addIssue({
								path: ['confirmNewPass'],
								code: 'custom',
								message: 'Passwords do not match'
							});
						}
					})
			},
			onSubmit: () => {
				console.log('submit');
			}
		});
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
									<form.Field name="firstName">
										{(field) => {
											return (
												<>
													<label
														htmlFor="firstName"
														className="mb-1 block text-sm font-medium text-skin-text-2"
													>
														First Name
													</label>
													<FormInput
														type="text"
														id="firstName"
														placeholder="Md"
														value={field.state.value}
														onChange={(e) => field.handleChange(e.target.value)}
														className={!field.state.meta.isValid ? '!bg-red-500/20' : ''}
													/>
													<em className="mt-2 text-xs text-red-500">
														{field.state.meta.isValid ? '' : 'First name is required'}
													</em>
												</>
											);
										}}
									</form.Field>
								</div>
								<div className="col-span-2 md:col-span-1">
									<form.Field name="lastName">
										{(field) => {
											return (
												<>
													<label
														htmlFor={field.name}
														className="mb-1 block text-sm font-medium text-skin-text-2"
													>
														Last Name
													</label>
													<FormInput
														type="text"
														id={field.name}
														value={field.state.value}
														onChange={(e) => field.handleChange(e.target.value)}
														className={!field.state.meta.isValid ? '!bg-red-500/20' : ''}
													/>
													<em className="mt-2 text-xs text-red-500">
														{field.state.meta.isValid ? '' : 'Last name is required'}
													</em>
												</>
											);
										}}
									</form.Field>
								</div>
								<div className="col-span-2 md:col-span-1">
									<form.Field name="email">
										{(field) => {
											return (
												<>
													<label
														htmlFor={field.name}
														className="mb-1 block text-sm font-medium text-skin-text-2"
													>
														Email
													</label>
													<FormInput
														type="email"
														placeholder='ex: "r5oNt@example.com"'
														id={field.name}
														value={field.state.value}
														onChange={(e) => field.handleChange(e.target.value)}
														className={!field.state.meta.isValid ? '!bg-red-500/20' : ''}
													/>
													<em className="mt-2 text-xs text-red-500">
														{field.state.meta.isValid ? '' : 'Please enter a valid email'}
													</em>
												</>
											);
										}}
									</form.Field>
								</div>
								<div className="col-span-2 md:col-span-1">
									<form.Field name="address">
										{(field) => {
											return (
												<>
													<label
														htmlFor="address"
														className="mb-1 block text-sm font-medium text-skin-text-2"
													>
														Address
													</label>
													<FormInput
														type="text"
														id="address"
														placeholder="Kingston, 5236, United States"
														onChange={(e) => field.handleChange(e.target.value)}
														value={field.state.value}
														className={!field.state.meta.isValid ? '!bg-red-500/20' : ''}
													/>
													<em className="mt-2 text-xs text-red-500">
														{field.state.meta.isValid ? '' : 'Please enter a valid Address'}
													</em>
												</>
											);
										}}
									</form.Field>
								</div>
							</div>
							{!isOAuth && (
								<div className="pt-6">
									<h3 className="mb-4 font-medium text-skin-text-2">Password Change</h3>
									<div className="space-y-4">
										<div>
											<form.Field name="currPass">
												{(field) => {
													return (
														<>
															<FormInput
																type="password"
																id={field.name}
																placeholder="Current Password"
																value={field.state.value}
																onChange={(e) => field.handleChange(e.target.value)}
																className={
																	!field.state.meta.isValid ? 'bg-red-500/20' : ''
																}
															/>
															<em className="mt-2 space-x-2 text-xs text-red-500">
																{!field.state.meta.isValid &&
																	field.state.meta.errors
																		// @ts-ignore
																		.map((e) => e.message)
																		.join(', ')}
															</em>
														</>
													);
												}}
											</form.Field>
										</div>
										<div>
											<form.Field name="newPass">
												{(field) => (
													<>
														<FormInput
															type="password"
															id={field.name}
															placeholder="New Password"
															value={field.state.value}
															onChange={(e) => field.handleChange(e.target.value)}
															className={!field.state.meta.isValid ? 'bg-red-500/20' : ''}
														/>
														<em className="mt-2 space-x-2 text-xs text-red-500">
															{!field.state.meta.isValid &&
																field.state.meta.errors
																	// @ts-ignore
																	.map((e) => e.message)
																	.join(', ')}
														</em>
													</>
												)}
											</form.Field>
										</div>
										<div>
											<form.Field name="confirmNewPass">
												{(field) => (
													<>
														<FormInput
															type="password"
															id={field.name}
															placeholder="Confirm New Password"
															value={field.state.value}
															onChange={(e) => field.handleChange(e.target.value)}
															className={!field.state.meta.isValid ? 'bg-red-500/20' : ''}
														/>
														<em className="mt-2 space-x-2 text-xs text-red-500">
															{!field.state.meta.isValid &&
																field.state.meta.errors
																	// @ts-ignore
																	.map((e) => e.message)
																	.join(', ')}
														</em>
													</>
												)}
											</form.Field>
											{/* <input
												type="password"
												id="confirmPassword"
												placeholder="Confirm New Password"
												className="px-4 py-3 w-full rounded-md bg-skin-secondary text-skin-text-2/50 focus:border-transparent focus:text-skin-text-2 focus:ring-2 focus:ring-skin-secondary-2"
											/> */}
										</div>
									</div>
								</div>
							)}

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

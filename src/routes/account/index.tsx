import { useForm } from '@tanstack/react-form';
import { createFileRoute, Link, redirect, useLoaderData } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { FormInput } from '@/components/form-input';
import { getProfile, getUser, isLoggedIn, updateProfile } from '@/utils/supabase';
import { toast } from 'sonner';

interface FormValues {
	firstName: string;
	lastName: string;
	email: string;
	address?: string;
	currPass?: string;
	newPass?: string;
	confirmNewPass?: string;
}

const formSchema = z
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
	});

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
		const profile = await getProfile();
		const user = await getUser();

		if (user instanceof Error || profile instanceof Error) {
			throw redirect({
				to: '/login'
			});
		}
		return {
			profile,
			isOAuth: user instanceof Error || user.identities?.[0]?.provider !== 'email' || false
		};
	},

	component: () => {
		const { profile, isOAuth } = useLoaderData({ from: '/account/' });
		const { t } = useTranslation();
		const form = useForm({
			defaultValues: {
				firstName: (profile.first_name || '') as string,
				lastName: (profile.last_name || '') as string,
				email: profile.email as string,
				address: profile.address as string,
				currPass: '',
				newPass: '',
				confirmNewPass: ''
			} as FormValues,
			validators: {
				onChange: formSchema
			},
			onSubmit: async ({ value, meta, formApi }) => {
				console.log({ value, meta, formApi });
				const res = await updateProfile({
					first_name: value.firstName,
					last_name: value.lastName,
					email: value.email,
					address: value.address || ''
				});
				if (res instanceof Error) {
					toast.error(res.message);
				}
				toast.success('Profile updated successfully');
			}
		});
		return (
			<div className="container p-4 mx-auto">
				<h1 className="mb-6 text-3xl font-bold">{t('accountPage.title')}</h1>
				<div className="flex flex-col gap-6 md:flex-row">
					<aside dir={t('dir')} className="w-full md:w-1/4">
						<nav>
							<ul>
								<h1 className="text-base font-medium text-start text-skin-text-2">
									{t('accountNav.title')}
								</h1>
								<li className="mb-2 ms-9 text-skin-text-2/50">
									<Link to="/account" className="hover:underline [&.active]:text-skin-secondary-2">
										{t('accountNav.profile')}
									</Link>
								</li>
								<li className="mb-2 ms-9 text-skin-text-2/50">
									<Link
										to="/account/orders"
										className="hover:underline [&.active]:text-skin-secondary-2"
									>
										{t('accountNav.orders')}
									</Link>
								</li>
								<h1 className="text-base font-medium text-start text-skin-text-2">
									{t('accountNav.wishlist.title')}
								</h1>
								<li className="mb-2 ms-9 text-skin-text-2/50">
									<Link
										to="/account/wishlist"
										className="hover:underline [&.active]:text-skin-secondary-2"
									>
										{t('accountNav.wishlist')}
									</Link>
								</li>
								<li className="mb-2 ms-9 text-skin-text-2/50">
									<Link
										to="/account/reviews"
										className="hover:underline [&.active]:text-skin-secondary-2"
									>
										{t('accountNav.reviews')}
									</Link>
								</li>
							</ul>
						</nav>
					</aside>
					<main className="p-8 w-full max-w-4xl rounded-lg shadow-md bg-skin-primary">
						<h2 className="mb-6 text-2xl font-medium text-skin-secondary-2">
							{t('accountPage.profileTitle')}
						</h2>

						<form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								<div className="col-span-2 md:col-span-1">
									<form.Field name="firstName">
										{(field) => {
											return (
												<>
													<label
														htmlFor="firstName"
														className="block mb-1 text-sm font-medium text-skin-text-2"
													>
														{t(`formFields.${field.name}`)}
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
														className="block mb-1 text-sm font-medium text-skin-text-2"
													>
														{t(`formFields.${field.name}`)}
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
														className="block mb-1 text-sm font-medium text-skin-text-2"
													>
														{t(`formFields.${field.name}`)}
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
														htmlFor={field.name}
														className="block mb-1 text-sm font-medium text-skin-text-2"
													>
														{t(`formFields.${field.name}`)}
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
									<h3 className="mb-4 font-medium text-skin-text-2">
										{t('formFields.passwordTitle')}
									</h3>
									<div className="space-y-4">
										<div>
											<form.Field name="currPass">
												{(field) => {
													return (
														<>
															<FormInput
																type="password"
																id={field.name}
																placeholder={t('formFields.password')}
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
															placeholder={t('formFields.newPassword')}
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
															placeholder={t('formFields.confirmPassword')}
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
									</div>
								</div>
							)}

							<div className="flex justify-end pt-6 space-x-4">
								<button
									type="button"
									className="px-6 py-3 rounded-sm text-skin-text-2 hover:bg-skin-button-2/20 focus:ring-2 focus:ring-skin-secondary-2 focus:ring-offset-2 focus:outline-none"
								>
									{t('formFields.buttons.cancel')}
								</button>
								<button
									type="submit"
									onClick={() => form.handleSubmit({ submitAction: 'save' })}
									className="px-12 py-3 rounded-sm border border-transparent transition-all duration-75 bg-skin-button-2 text-skin-text hover:bg-skin-button-2/80 focus:ring-2 focus:ring-skin-secondary-2 focus:ring-offset-2 focus:outline-none"
								>
									{t('formFields.buttons.save')}
								</button>
							</div>
						</form>
					</main>
				</div>
			</div>
		);
	}
});

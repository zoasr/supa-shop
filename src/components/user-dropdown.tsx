import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '$/components/ui/dropdown-menu';
import { cn } from '$/lib/utils';
import { Link, useLoaderData, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import logoutIcon from '@/assets/Icon-logout.svg';
import reviewsIcon from '@/assets/Icon-Reviews.svg';
import orderIcon from '@/assets/icon-mallbag.svg';
import UserIcon from '@/assets/user.svg?react';
import { supabase } from '@/utils/supabase';

const UserDropdown = () => {
	const router = useRouter();
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const handleChange = (open: boolean) => {
		setOpen(open);
	};
	const { imageUrl } = useLoaderData({ from: '__root__' });
	return (
		<DropdownMenu onOpenChange={handleChange} open={open} modal={false}>
			<DropdownMenuTrigger
				className={cn(
					'p-2 rounded-full transition-all duration-150 group',
					'hover:bg-skin-secondary-2',
					'active:bg-skin-secondary-2',
					'focus-visible:bg-skin-secondary-2',
					{
						'bg-skin-secondary-2': open
					}
				)}
			>
				{!(imageUrl instanceof Error) && imageUrl ? (
					<img
						src={imageUrl}
						alt="User Icon"
						data-has-icon={!!imageUrl}
						className={cn(
							'size-10 rounded-full data-[has-icon=false]:group-hover:invert data-[has-icon=false]:group-focus-visible:invert data-[has-icon=false]:group-active:invert',
							{
								'data-[has-icon=false]:invert': open
							}
						)}
					/>
				) : (
					<UserIcon className="group-hover:text-skin-primary" />
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent className="text-white border-none filter backdrop-blur-xl bg-black/50">
				<Link to="/account">
					<DropdownMenuItem className="flex gap-2 cursor-pointer focus:bg-skin-secondary-2 focus:text-white">
						<UserIcon className="text-white size-8" />
						{t('header.dropdown.account')}
					</DropdownMenuItem>
				</Link>
				<Link to="/account/orders">
					<DropdownMenuItem className="flex gap-2 cursor-pointer focus:bg-skin-secondary-2 focus:text-white">
						<img className="invert" src={orderIcon} alt="" />
						{t('header.dropdown.orders')}
					</DropdownMenuItem>
				</Link>
				<Link to="/account/reviews">
					<DropdownMenuItem className="flex gap-2 cursor-pointer focus:bg-skin-secondary-2 focus:text-white">
						<img className="invert" src={reviewsIcon} alt="" />
						{t('header.dropdown.reviews')}
					</DropdownMenuItem>
				</Link>
				<button
					onClick={() => {
						supabase.auth.signOut();
						router.invalidate();
					}}
					className="w-full"
				>
					<DropdownMenuItem className="flex gap-2 cursor-pointer focus:bg-skin-secondary-2 focus:text-white">
						<img className="invert" src={logoutIcon} alt="" />
						{t('header.dropdown.logout')}
					</DropdownMenuItem>
				</button>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserDropdown;

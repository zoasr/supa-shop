import UserIcon from '@/assets/user.svg?react';

import logoutIcon from '@/assets/Icon-logout.svg';
import orderIcon from '@/assets/icon-mallbag.svg';
import reviewsIcon from '@/assets/Icon-Reviews.svg';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '$/components/ui/dropdown-menu';
import { cn } from '$/lib/utils';
import { useState } from 'react';
import { Link, useLoaderData } from '@tanstack/react-router';
import { supabase } from '@/utils/supabase';
import { useRouter } from '@tanstack/react-router';
const UserDropdown = () => {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const handleChange = (open: boolean) => {
		setOpen(open);
	};
	const { imageUrl } = useLoaderData({ from: '__root__' });
	return (
		<>
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
					<DropdownMenuItem className="flex gap-2 focus:bg-skin-secondary-2">
						<UserIcon className="text-white size-8" />
						{/* <img className="invert" src={userIcon} alt="" /> */}
						<Link to="/account">Manage My Account</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className="flex gap-2 focus:bg-skin-secondary-2">
						<img className="invert" src={orderIcon} alt="" />
						<Link to="/account/orders">My orders</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className="flex gap-2 focus:bg-skin-secondary-2">
						<img className="invert" src={reviewsIcon} alt="" />
						<Link to="/account/reviews">My reviews</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className="flex gap-2 focus:bg-skin-secondary-2">
						<img className="invert" src={logoutIcon} alt="" />
						<button
							onClick={() => {
								supabase.auth.signOut();
								router.invalidate();
							}}
						>
							Logout
						</button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

export default UserDropdown;

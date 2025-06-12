import userIcon from "@/assets/user.svg";

import logoutIcon from "@/assets/Icon-logout.svg";
import orderIcon from "@/assets/icon-mallbag.svg";
import reviewsIcon from "@/assets/Icon-Reviews.svg";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "$/components/ui/dropdown-menu";
import { cn } from "$/lib/utils";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/utils/supabase";

const UserDropdown = () => {
	const [open, setOpen] = useState(false);
	const handleChange = (open: boolean) => {
		setOpen(open);
	};
	return (
		<>
			<DropdownMenu onOpenChange={handleChange} open={open} modal={false}>
				<DropdownMenuTrigger
					className={cn(
						"p-2 rounded-full transition-all duration-150 group",
						"hover:bg-skin-secondary-2",
						"active:bg-skin-secondary-2",
						"focus-visible:bg-skin-secondary-2",
						{
							"bg-skin-secondary-2": open,
						}
					)}
				>
					<img
						src={userIcon}
						alt=""
						className={cn(
							"group-hover:invert group-focus-visible:invert group-active:invert",
							{
								invert: open,
							}
						)}
					/>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="border-none filter backdrop-blur-xl bg-black/50 text-skin-text">
					<DropdownMenuItem className="flex gap-2 focus:bg-skin-secondary-2 focus:text-skin-text">
						<img className="invert" src={userIcon} alt="" />
						<Link to="/account">Manage My Account</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className="flex gap-2 focus:bg-skin-secondary-2 focus:text-skin-text">
						<img className="invert" src={orderIcon} alt="" />
						<Link to="/account/orders">My orders</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className="flex gap-2 focus:bg-skin-secondary-2 focus:text-skin-text">
						<img className="invert" src={reviewsIcon} alt="" />
						<Link to="/account/reviews">My reviews</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className="flex gap-2 focus:bg-skin-secondary-2 focus:text-skin-text">
						<img className="invert" src={logoutIcon} alt="" />
						<button
							onClick={() => {
								supabase.auth.signOut();
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

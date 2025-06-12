import sendIcon from "@/assets/icon-send.svg";
import { Link } from "@tanstack/react-router";
import { Icon } from "@iconify-icon/react";

import app from "@/assets/app.png";
const Footer = () => {
	return (
		<footer className="bg-skin-button">
			<div className="flex flex-col md:flex-row gap-8 justify-around items-center md:items-start text-center md:text-start container mx-auto py-[80px] text-skin-text">
				<div className="flex flex-col gap-4">
					<h1 className="text-2xl font-bold">Exclusive</h1>
					<h2 className="text-xl font-medium">Subscribe</h2>
					<p>Get 10% off your first order</p>
					<label className="flex gap-2 px-5 py-3 rounded-md ring-2 ring-skin-text w-fit">
						<input
							type="text"
							placeholder="Enter your email"
							className="bg-transparent outline-none flex-shrink-1"
						/>
						<button className="flex-1 flex-shrink-0">
							<img src={sendIcon} className="invert" alt="" />
						</button>
					</label>
				</div>
				<div className="flex flex-col gap-4">
					<h2 className="text-xl font-medium">Support</h2>
					<ul className="flex flex-col gap-2">
						<li>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</li>
						<li>exclusive@gmail.com</li>
						<li>+88015-88888-9999</li>
					</ul>
				</div>
				<div className="flex flex-col gap-4">
					<h2 className="text-xl font-medium">Account</h2>
					<ul className="flex flex-col gap-2">
						<li>
							<Link>My Account</Link>
						</li>
						<li>
							<Link>Login / Register</Link>
						</li>
						<li>
							<Link>Cart</Link>
						</li>
						<li>
							<Link>Wishlist</Link>
						</li>
						<li>
							<Link>Shop</Link>
						</li>
					</ul>
				</div>
				<div className="flex flex-col gap-4">
					<h2 className="text-xl font-medium">Quick Links</h2>
					<ul className="flex flex-col gap-2">
						<li>
							<Link>Privacy policy</Link>
						</li>
						<li>
							<Link>Terms of use</Link>
						</li>
						<li>
							<Link>FAQ</Link>
						</li>
						<li>
							<Link>Contact</Link>
						</li>
					</ul>
				</div>
				<div className="flex flex-col gap-4">
					<h2 className="text-xl font-medium">Download App</h2>
					<p className="text-sm text-skin-secondary/50">
						Save $3 as a new user only
					</p>
					<img src={app} alt="" />
					<ul className="flex gap-2 justify-center">
						<li>
							<a href="#">
								<Icon icon="ri:facebook-line" />
							</a>
						</li>
						<li>
							<a href="#">
								<Icon icon="ri:twitter-line" />
							</a>
						</li>
						<li>
							<a href="#">
								<Icon icon="ri:instagram-line" />
							</a>
						</li>
						<li>
							<a href="#">
								<Icon icon="ri:linkedin-line" />
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="py-4 w-full text-center border-t-2 border-skin-secondary/10 text-skin-primary/30">
				&copy; Copyright Rimel 2022. All right reserved
			</div>
		</footer>
	);
};

export default Footer;

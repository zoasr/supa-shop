import SendIcon from "@/assets/icon-send.svg?react";
import { Link } from "@tanstack/react-router";
import { Icon } from "@iconify-icon/react";

import app from "@/assets/app.png";
import { useTranslation } from "react-i18next";
const Footer = () => {
	const { t } = useTranslation();
	return (
		<footer className="bg-skin-primary ">
			<div className="flex flex-col md:flex-row gap-8 justify-around items-center md:items-start text-center md:text-start container mx-auto py-[80px] ">
				<div className="flex flex-col gap-4">
					<h1 className="text-2xl font-bold">
						{t("footer.exclusive.title")}
					</h1>
					<h2 className="text-xl font-medium">
						{t("footer.exclusive.subscribe.title")}
					</h2>
					<p>{t("footer.exclusive.subscribe.text")}</p>
					<label className="flex gap-2 px-5 py-3 rounded-md ring-2 ring-skin-text w-fit">
						<input
							type="text"
							placeholder={t(
								"footer.exclusive.subscribe.placeholder"
							)}
							className="bg-transparent outline-none flex-shrink-1"
						/>
						<button className="flex-1 shrink-0">
							<SendIcon />
						</button>
					</label>
				</div>
				<div className="flex flex-col gap-4">
					<h2 className="text-xl font-medium">
						{t("footer.support.title")}
					</h2>
					<ul className="flex flex-col gap-2">
						<li>{t("footer.support.address")}</li>
						<li>{t("footer.support.email")}</li>
						<li>{t("footer.support.phone")}</li>
					</ul>
				</div>
				<div className="flex flex-col gap-4">
					<h2 className="text-xl font-medium">
						{t("footer.account.title")}
					</h2>
					<ul className="flex flex-col gap-2">
						<li>
							<Link to="/account">
								{t("footer.account.myAccount")}
							</Link>
						</li>
						<li>
							<Link to="/login">
								{t("footer.account.loginRegister")}
							</Link>
						</li>
						<li>
							<Link to="/account/cart">
								{t("footer.account.cart")}
							</Link>
						</li>
						<li>
							<Link to="/account/wishlist">
								{t("footer.account.wishlist")}
							</Link>
						</li>
						<li>
							<Link to="/products">
								{t("footer.account.shop")}
							</Link>
						</li>
					</ul>
				</div>
				<div className="flex flex-col gap-4">
					<h2 className="text-xl font-medium">
						{t("footer.quickLinks.title")}
					</h2>
					<ul className="flex flex-col gap-2">
						<li>
							<Link to="/">
								{t("footer.quickLinks.privacyPolicy")}
							</Link>
						</li>
						<li>
							<Link to="/">
								{t("footer.quickLinks.termsOfUse")}
							</Link>
						</li>
						<li>
							<Link to="/">{t("footer.quickLinks.faq")}</Link>
						</li>
						<li>
							<Link to="/">{t("footer.quickLinks.contact")}</Link>
						</li>
					</ul>
				</div>
				<div className="flex flex-col gap-4">
					<h2 className="text-xl font-medium">
						{t("footer.downloadApp.title")}
					</h2>
					<p className="text-sm text-skin-secondary/50">
						{t("footer.downloadApp.text")}
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
				{t("footer.copyright")}
			</div>
		</footer>
	);
};

export default Footer;

import { Link } from "@tanstack/react-router";
import LanguageChanger from "./language-changer";

const TopCallout = () => {
	return (
		<>
			<div className="w-full text-center bg-skin-button text-skin-primary">
				<div className="container flex flex-wrap gap-8 justify-center items-center py-4 mx-auto text-sm">
					<span>
						Summer Sale For All Swim Suits And Free Express Delivery
						- OFF 50%!{"  "}
						<Link to="/" className="font-bold underline">
							Shop Now
						</Link>
					</span>
					<span className="dark">
						<LanguageChanger />
					</span>
				</div>
			</div>
		</>
	);
};

export default TopCallout;

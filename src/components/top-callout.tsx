import { Link } from '@tanstack/react-router';
import LanguageChanger from './language-changer';

const TopCallout = () => {
	return (
		<>
			<div className="w-full bg-skin-button text-center text-skin-primary">
				<div className="container mx-auto flex flex-wrap items-center justify-center gap-8 py-4 text-sm">
					<span>
						Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{'  '}
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

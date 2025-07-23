import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import LanguageChanger from './language-changer';

const TopCallout = () => {
	const [open, setOpen] = useState(true);
	return (
		<div
			data-open={open}
			className="group grid grid-rows-[1fr] data-[open=false]:grid-rows-[0fr] w-full transition-all text-center text-white bg-skin-secondary-2"
		>
			<div className="container flex relative group-data-[open=false]:invisible flex-wrap gap-8 justify-center items-center group-data-[open=true]:py-4 mx-auto min-h-0 text-sm">
				<span>
					Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{'  '}
					<Link to="/" className="font-bold underline">
						Shop Now
					</Link>
				</span>
				<LanguageChanger />
				<button className="absolute top-2 right-2 text-xl" onClick={() => setOpen((p) => !p)}>
					x
				</button>
			</div>
		</div>
	);
};

export default TopCallout;

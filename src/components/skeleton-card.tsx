import { cn } from '$/lib/utils';
import emptyStar from '@/assets/star-empty.svg';

const SkeletonCard = () => {
	return (
		<div className="group/card w-[300px] min-w-[300px] text-skin-secondary">
			<div className="relative overflow-clip rounded-lg">
				<div className="max-[270px] flex h-[250px] animate-pulse items-center justify-center bg-skin-secondary"></div>
			</div>
			<span>
				<span className="p-2 mt-2 w-1/3 h-6 rounded-md animate-pulse bg-accent"></span>
				<p className="font-medium animate-pulse">
					$XXX
					<span className="line-through">$XXX</span>
				</p>
				<div className="flex gap-2 justify-start items-center animate-pulse">
					<div className="flex gap-1">
						{[...Array(5)].map((_, i) => (
							<img key={i} src={emptyStar} alt="star" className="w-4 h-4 opacity-20" />
						))}
					</div>
					<span>({Math.floor(Math.random() * 100)})</span>
				</div>
				<div className="flex gap-2">
					{[...Array(3)].map((_, i) => (
						<button
							type="button"
							key={i}
							className={cn('rounded-full size-4 bg-skin-secondary', {
								'ring-2 ring-black': false
							})}
						></button>
					))}
				</div>
			</span>
		</div>
	);
};

export default SkeletonCard;

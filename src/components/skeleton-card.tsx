import { cn } from '$/lib/utils';
import emptyStar from '@/assets/star-empty.svg';

const SkeletonCard = () => {
	return (
		<>
			<div className="group/card w-[300px] min-w-[300px] text-skin-secondary">
				<div className="relative overflow-clip rounded-lg">
					<div className="max-[270px] flex h-[250px] animate-pulse items-center justify-center bg-skin-secondary"></div>
				</div>
				<span>
					<h2 className="mt-2 h-6 w-1/3 animate-pulse rounded-md bg-accent p-2"></h2>
					<p className="animate-pulse font-medium">
						$XXX
						<span className="line-through">$XXX</span>
					</p>
					<div className="flex animate-pulse items-center justify-start gap-2">
						<div className="flex gap-1">
							{[...Array(5)].map((_, i) => (
								<img key={i} src={emptyStar} alt="star" className="h-4 w-4 opacity-20" />
							))}
						</div>
						<span>({Math.floor(Math.random() * 100)})</span>
					</div>
					<div className="flex gap-2">
						{[...Array(3)].map((_, i) => (
							<button
								key={i}
								className={cn('size-4 rounded-full bg-skin-secondary', {
									'ring-2 ring-black': false
								})}
							></button>
						))}
					</div>
				</span>
			</div>
		</>
	);
};

export default SkeletonCard;

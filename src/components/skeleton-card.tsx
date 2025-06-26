import { cn } from "$/lib/utils";
import emptyStar from "@/assets/star-empty.svg";

const SkeletonCard = () => {
	return (
		<>
			<div className="min-w-[300px] w-[300px] group/card text-skin-secondary">
				<div className="relative overflow-clip rounded-lg">
					<div
						className="max-[270px] h-[250px] animate-pulse bg-skin-secondary flex items-center justify-center"
						style={{
							viewTransitionName: `product-picture}`,
						}}
					></div>
				</div>
				<span>
					<h2 className=" w-1/3 p-2 animate-pulse bg-accent h-6 rounded-md mt-2"></h2>
					<p className="font-medium animate-pulse ">
						$XXX
						<span className="line-through ">$XXX</span>
					</p>
					<div className="flex gap-2 justify-start items-center animate-pulse">
						<div className="flex gap-1">
							{[...Array(5)].map((_, i) => (
								<img
									key={i}
									src={emptyStar}
									alt="star"
									className="w-4 h-4 opacity-20"
								/>
							))}
						</div>
						<span>({Math.floor(Math.random() * 100)})</span>
					</div>
					<div className="flex gap-2">
						{[...Array(3)].map((_, i) => (
							<button
								key={i}
								className={cn(
									"rounded-full size-4 bg-skin-secondary",
									{
										"ring-2 ring-black": false,
									}
								)}
							></button>
						))}
					</div>
				</span>
			</div>
		</>
	);
};

export default SkeletonCard;

import { cn } from "$/lib/utils";

const SectionLabel = ({ title }: { title: string }) => {
	return (
		<>
			<div className="flex gap-2 items-center mb-8">
				<span className="w-5 h-10 rounded-lg bg-skin-secondary-2"></span>
				<h1
					className={cn(
						"relative text-base font-semibold text-skin-secondary-2"
					)}
				>
					{title}
				</h1>
			</div>
		</>
	);
};

export default SectionLabel;

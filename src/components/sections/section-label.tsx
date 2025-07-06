import { cn } from '$/lib/utils';

const SectionLabel = ({ title }: { title: string }) => {
	return (
		<div className="mb-8 flex items-center gap-2">
			<span className="h-10 w-5 rounded-sm bg-skin-secondary-2"></span>
			<h1 className={cn('relative text-base font-semibold text-skin-secondary-2')}>{title}</h1>
		</div>
	);
};

export default SectionLabel;

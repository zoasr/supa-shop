import { Input } from '$/components/ui/input';
import { cn } from '$/lib/utils';

export const FormInput = ({ className, required, ...props }: React.ComponentProps<typeof Input>) => {
	return (
		<span
			className={cn(
				'flex items-center px-4 py-3 w-full h-auto rounded-md border-0 transition-all bg-skin-secondary text-skin-text-2/50 selection:bg-skin-secondary-2 placeholder:text-skin-text-2/30 has-focus:border-transparent has-focus:text-skin-text-2 has-focus:ring-2 has-focus:ring-skin-secondary-2',
				className
			)}
		>
			<Input className="bg-transparent border-0 focus-visible:ring-0" {...props} />
			{required && <span className="text-red-500">*</span>}
		</span>
	);
};

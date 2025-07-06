const ErrorComponent = ({ error }: { error: Error }) => {
	return (
		<div className="w-full rounded-lg bg-red-800 px-8 py-4 text-red-200 shadow-lg ring-white/20">
			Error: {error.message}
		</div>
	);
};

export default ErrorComponent;

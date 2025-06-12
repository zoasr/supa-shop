const ErrorComponent = ({ error }: { error: Error }) => {
	return (
		<>
			<div className="px-8 py-4 w-full text-red-200 bg-red-800 rounded-lg shadow-lg ring-white/20">
				Error: {error.message}
			</div>
		</>
	);
};

export default ErrorComponent;

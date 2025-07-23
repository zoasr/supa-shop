import { Button } from '$/components/ui/button';
import { type ErrorComponentProps, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

const ErrorComponent = ({ error, info }: ErrorComponentProps) => {
	const { t } = useTranslation();

	return (
		<main className="container flex flex-col gap-8 justify-center items-center min-h-[70dvh] py-16 mx-auto text-center">
			<h1 className="text-[clamp(3rem,8vw,9rem)] font-medium text-red-700">{t('common.error.error')}</h1>
			<div className="flex flex-col gap-4 px-4 py-4 w-full text-left text-red-700 rounded-sm ring-2 ring-red-700">
				<span className="text-2xl font-bold">{t('common.error.errorTitle')}</span> {error.message}
				<pre>{JSON.stringify(info, null, 2)}</pre>
			</div>
			<Link to="/">
				<Button>{t('common.error.back')}</Button>
			</Link>
		</main>
	);
};

export default ErrorComponent;

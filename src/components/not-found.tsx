import { Button } from '$/components/ui/button';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
	const { t } = useTranslation();
	return (
		<main className="container flex flex-col gap-8 justify-center items-center py-16 mx-auto text-center h-[70dvh]">
			<h1 className=" text-[clamp(3rem,8vw,9rem)] font-medium">{t('common.error.404')}</h1>
			<p>{t('common.error.notFound')}</p>
			<Link to="/">
				<Button>{t('common.error.back')}</Button>
			</Link>
		</main>
	);
};

export default NotFound;

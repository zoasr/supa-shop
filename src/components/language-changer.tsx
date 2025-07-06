import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '$/components/ui/select';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';

const items = ['en', 'ar'].map((lang) => ({
	label: lang === 'en' ? 'English' : 'العربية',
	value: lang
}));
const LanguageChanger = () => {
	const { t } = useTranslation();

	return (
		<Select onValueChange={(i) => i18n.changeLanguage(i)}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder={t('language')} />
			</SelectTrigger>
			<SelectContent>
				{items.map((item) => (
					<SelectItem key={item.value} className="cursor-pointer" value={item.value}>
						{item.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default LanguageChanger;

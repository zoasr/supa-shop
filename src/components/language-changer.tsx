import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '$/components/ui/select';
import { useTranslation } from 'react-i18next';
import type { Langs } from '@/i18n';
import { useLangStore } from '@/store/lang';

const items: { label: string; value: Langs }[] = (['en', 'ar'] as const).map((lang) => ({
	label: lang === 'en' ? 'English' : 'العربية',
	value: lang
}));
const LanguageChanger = () => {
	const { t } = useTranslation();
	const toggleLang = useLangStore((state) => state.toggleLang);

	return (
		<Select onValueChange={(i: Langs) => toggleLang(i)}>
			<SelectTrigger className="w-[180px] !text-white border-white focus-visible:ring-white/50 focus-visible:border-border ">
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

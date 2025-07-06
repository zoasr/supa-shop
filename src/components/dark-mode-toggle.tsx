import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '@/store/theme';

const DarkModeToggle = () => {
	const { t } = useTranslation();
	const isDarkMode = useThemeStore((selector) => selector.isDarkMode);
	const setIsDarkMode = useThemeStore((selector) => selector.toggleDarkMode);

	return (
		<button onClick={setIsDarkMode} className="flex gap-2 justify-between p-2 rounded-sm">
			{isDarkMode ? <Moon className="text-foreground" /> : <Sun className="text-foreground" />}
			{isDarkMode ? t('header.theme.dark') : t('header.theme.light')}
		</button>
	);
};

export default DarkModeToggle;

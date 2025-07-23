import { Button } from '$/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '@/store/theme';

const DarkModeToggle = () => {
	const { t } = useTranslation();
	const isDarkMode = useThemeStore((selector) => selector.isDarkMode);
	const setIsDarkMode = useThemeStore((selector) => selector.toggleDarkMode);

	return (
		<Button variant="ghost" onClick={setIsDarkMode} className="flex gap-2 justify-between p-2 !text-lg rounded-sm">
			{isDarkMode ? <Moon className="text-foreground size-6" /> : <Sun className="text-foreground size-6" />}
			{isDarkMode ? t('header.theme.dark') : t('header.theme.light')}
		</Button>
	);
};

export default DarkModeToggle;

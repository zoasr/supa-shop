import { useThemeStore } from '@/store/theme';
import { Moon, Sun } from 'lucide-react';

const DarkModeToggle = () => {
	const isDarkMode = useThemeStore((selector) => selector.isDarkMode);
	const setIsDarkMode = useThemeStore((selector) => selector.toggleDarkMode);

	return (
		<button onClick={setIsDarkMode} className="flex justify-between gap-2 rounded-sm p-2">
			{isDarkMode ? <Moon className="text-foreground" /> : <Sun className="text-foreground" />}
			{isDarkMode ? 'Dark' : 'Light'}
		</button>
	);
};

export default DarkModeToggle;

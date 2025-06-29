import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
Moon;

const DarkModeToggle = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [isDarkMode]);

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
	};

	return (
		<button onClick={toggleDarkMode} className="flex justify-between gap-2 rounded-sm p-2">
			{isDarkMode ? <Moon className="text-foreground" /> : <Sun className="text-foreground" />}
			{isDarkMode ? 'Dark' : 'Light'}
		</button>
	);
};

export default DarkModeToggle;

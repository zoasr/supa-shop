import { create } from 'zustand';

interface ThemeStore {
	isDarkMode: boolean;
	toggleDarkMode: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
	isDarkMode: false,
	toggleDarkMode: () =>
		set((state) => {
			const newMode = !state.isDarkMode;
			if (newMode) {
				document.documentElement.classList.add('dark');
				localStorage.setItem('theme', 'dark');
			} else {
				document.documentElement.classList.remove('dark');
				localStorage.setItem('theme', 'light');
			}
			return { isDarkMode: newMode };
		})
}));

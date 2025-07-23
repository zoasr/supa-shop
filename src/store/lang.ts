import { create } from 'zustand';
import i18n, { type Langs } from '@/i18n';

interface LangStore {
	lang: Langs;
	toggleLang: (lng: Langs) => void;
}

export const useLangStore = create<LangStore>((set) => ({
	lang: 'en',
	toggleLang: (lng) =>
		set((state) => {
			const newLang = state.lang === 'en' ? 'ar' : 'en';
			i18n.changeLanguage(lng);
			localStorage.setItem('lang', lng);
			return { lang: lng };
		})
}));

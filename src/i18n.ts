import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
	en: {
		translation: {
			language: "English",
			dir: "ltr",
			// Header
			"header.title": "Exclusive",
			"header.navbar.home": "Home",
			"header.navbar.about": "About",
			"header.navbar.contact": "Contact",
			"header.navbar.signup": "Sign Up",
			"header.search.placeholder": "What are you looking for?",

			hero: {
				categories: {
					"category-1": "Woman's Fashion",
					"category-2": "Men's Fashion",
					"category-3": "Electronics",
					"category-4": "Home & Lifestyle",
					"category-5": "Medicine",
					"category-6": "Sports & Outdoor",
					"category-7": "Baby's & Toys",
					"category-8": "Groceries & Pets",
					"category-9": "Health & Beauty",
				},
			},
			time: {
				days: "Days",
				hours: "Hours",
				minutes: "Minutes",
				seconds: "Seconds",
			},
			todays: {
				label: "Today's",
				title: "Flash Sales",
				button: "View all products",
			},
			categories: {
				label: "Categories",
				title: "Browse by category",
				phones: "Phones",
				watches: "Smart Watches",
				camera: "Camera",
				gaming: "Gaming",
				headphones: "Headphones",
				computers: "Computers",
			},
			"best-selling": {
				label: "This month",
				title: "Best Selling Products",
				button: "View all ",
			},
			products: {
				label: "Our Products",
				title: "Explore our products",
				button: "View all products",
			},
			featured: {
				label: "Featured",
				title: "New arrivals",
			},
		},
	},
	ar: {
		translation: {
			language: "العربية",
			dir: "rtl",
			// Header
			"header.title": "Exclusive",
			"header.navbar.home": "الصفحة الرئيسية",
			"header.navbar.about": "عنا",
			"header.navbar.contact": "اتصل بنا",
			"header.navbar.signup": "سجل",
			"header.search.placeholder": "ما الذي تبحث عنه؟",
			hero: {
				categories: {
					"category-1": "موضة النساء",
					"category-2": "موضة الرجال",
					"category-3": "الكترونيات",
					"category-4": "المنزل والمستلزمات",
					"category-5": "الطبية",
					"category-6": "الرياضة والمناطق الخارجية",
					"category-7": "الطفل والألعاب",
					"category-8": "البقالة والحيوانات",
					"category-9": "الصحة والجمال",
				},
			},
			time: {
				days: "أيام",
				hours: "ساعات",
				minutes: "دقائق",
				seconds: "ثواني",
			},
			todays: {
				label: "اليوم",
				title: "المبيعات الفورية",
				button: "عرض جميع المنتجات",
			},
			categories: {
				label: "الفئات",
				title: "تصفح حسب الفئة",
				phones: "الهواتف",
				watches: "الساعات الذكية",
				camera: "الكاميرات",
				gaming: "الألعاب",
				headphones: "السماعات",
				computers: "أجهزة الكمبيوتر",
			},
			"best-selling": {
				label: "هذا الشهر",
				title: "المنتجات الأكثر مبيعاً",
				button: "عرض الكل",
			},
			products: {
				label: "منتجاتنا",
				title: "تصفح المنتجات",
				button: "عرض جميع المنتجات",
			},
			featured: {
				label: "متميزة",
				title: "المنتجات الجديدة",
			},
		},
	},
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
		// you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
		// if you're using a language detector, do not define the lng option
		resources,
	});

export default i18n;

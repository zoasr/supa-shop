import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const footerTranslation = {
	en: {
		translation: {
			footer: {
				exclusive: {
					title: 'Exclusive',
					subscribe: {
						title: 'Subscribe',
						text: 'Get 10% off your first order',
						placeholder: 'Enter your email'
					}
				},
				support: {
					title: 'Support',
					address: '111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.',
					email: 'exclusive@gmail.com',
					phone: '+88015-88888-9999'
				},
				account: {
					title: 'Account',
					myAccount: 'My Account',
					loginRegister: 'Login / Register',
					cart: 'Cart',
					wishlist: 'Wishlist',
					shop: 'Shop'
				},
				quickLinks: {
					title: 'Quick Links',
					privacyPolicy: 'Privacy Policy',
					termsOfUse: 'Terms of Use',
					faq: 'FAQ',
					contact: 'Contact'
				},
				downloadApp: {
					title: 'Download App',
					text: 'Save $3 with App New User Only',
					googlePlay: 'Google Play',
					appStore: 'App Store'
				},
				copyright: '© Copyright Rimel 2022. All right reserved'
			}
		}
	},
	ar: {
		translation: {
			footer: {
				exclusive: {
					title: 'حصري',
					subscribe: {
						title: 'اشترك',
						text: 'احصل على خصم 10٪ على طلبك الأول',
						placeholder: 'أدخل بريدك الإلكتروني'
					}
				},
				support: {
					title: 'الدعم',
					address: '111 بيجوي ساراني، دكا، بنجلاديش',
					email: 'exclusive@gmail.com',
					phone: '+88015-88888-9999'
				},
				account: {
					title: 'الحساب',
					myAccount: 'حسابي',
					loginRegister: 'تسجيل الدخول / التسجيل',
					cart: 'سلة التسوق',
					wishlist: 'قائمة الرغبات',
					shop: 'تسوق'
				},
				quickLinks: {
					title: 'روابط سريعة',
					privacyPolicy: 'سياسة الخصوصية',
					termsOfUse: 'شروط الاستخدام',
					faq: 'الأسئلة الشائعة',
					contact: 'اتصل بنا'
				},
				downloadApp: {
					title: 'حمل التطبيق',
					text: 'وفر 3 دولارات مع التطبيق للمستخدمين الجدد فقط',
					googlePlay: 'جوجل بلاي',
					appStore: 'متجر التطبيقات'
				},
				copyright: '© حقوق النشر ريمل 2022. جميع الحقوق محفوظة'
			}
		}
	}
};

const wishlistTranslation = {
	en: {
		translation: {
			wishlist: {
				title: 'Wishlist',
				moveAllToBag: 'Move All To Cart',
				addToCart: 'Add To Cart',
				justForYou: 'Just For You',
				seeAll: 'See All'
			}
		}
	},
	ar: {
		translation: {
			wishlist: {
				title: 'قائمة الرغبات',
				moveAllToBag: 'نقل الكل إلى السلة',
				addToCart: 'أضف إلى السلة',
				justForYou: 'من أجلك فقط',
				seeAll: 'عرض الكل'
			}
		}
	}
};

const headerTranslation = {
	en: {
		translation: {
			// Header
			'header.title': 'Exclusive',
			'header.navbar.home': 'Home',
			'header.navbar.about': 'About',
			'header.navbar.contact': 'Contact',
			'header.navbar.signup': 'Sign Up',
			'header.search.placeholder': 'What are you looking for?'
		}
	},
	ar: {
		translation: {
			// Header
			'header.title': 'Exclusive',
			'header.navbar.home': 'الصفحة الرئيسية',
			'header.navbar.about': 'عنا',
			'header.navbar.contact': 'اتصل بنا',
			'header.navbar.signup': 'سجل',
			'header.search.placeholder': 'ما الذي تبحث عنه؟'
		}
	}
};

const heroTranslation = {
	en: {
		translation: {
			hero: {
				categories: {
					'category-1': "Woman's Fashion",
					'category-2': "Men's Fashion",
					'category-3': 'Electronics',
					'category-4': 'Home & Lifestyle',
					'category-5': 'Medicine',
					'category-6': 'Sports & Outdoor',
					'category-7': "Baby's & Toys",
					'category-8': 'Groceries & Pets',
					'category-9': 'Health & Beauty'
				}
			}
		}
	},
	ar: {
		translation: {
			hero: {
				categories: {
					'category-1': 'موضة النساء',
					'category-2': 'موضة الرجال',
					'category-3': 'الكترونيات',
					'category-4': 'المنزل والمستلزمات',
					'category-5': 'الطبية',
					'category-6': 'الرياضة والمناطق الخارجية',
					'category-7': 'الطفل والألعاب',
					'category-8': 'البقالة والحيوانات',
					'category-9': 'الصحة والجمال'
				}
			}
		}
	}
};

const timeTranslation = {
	en: {
		translation: {
			time: {
				days: 'Days',
				hours: 'Hours',
				minutes: 'Minutes',
				seconds: 'Seconds'
			}
		}
	},
	ar: {
		translation: {
			time: {
				days: 'أيام',
				hours: 'ساعات',
				minutes: 'دقائق',
				seconds: 'ثواني'
			}
		}
	}
};

const todaysTranslation = {
	en: {
		translation: {
			todays: {
				label: "Today's",
				title: 'Flash Sales',
				button: 'View all products'
			}
		}
	},
	ar: {
		translation: {
			todays: {
				label: 'اليوم',
				title: 'المبيعات الفورية',
				button: 'عرض جميع المنتجات'
			}
		}
	}
};

const categoriesTranslation = {
	en: {
		translation: {
			categories: {
				label: 'Categories',
				title: 'Browse by category',
				phones: 'Phones',
				watches: 'Smart Watches',
				camera: 'Camera',
				gaming: 'Gaming',
				headphones: 'Headphones',
				computers: 'Computers'
			}
		}
	},
	ar: {
		translation: {
			categories: {
				label: 'الفئات',
				title: 'تصفح حسب الفئة',
				phones: 'الهواتف',
				watches: 'الساعات الذكية',
				camera: 'الكاميرات',
				gaming: 'الألعاب',
				headphones: 'السماعات',
				computers: 'أجهزة الكمبيوتر'
			}
		}
	}
};

const bestSellingTranslation = {
	en: {
		translation: {
			'best-selling': {
				label: 'This month',
				title: 'Best Selling Products',
				button: 'View all '
			}
		}
	},
	ar: {
		translation: {
			'best-selling': {
				label: 'هذا الشهر',
				title: 'المنتجات الأكثر مبيعاً',
				button: 'عرض الكل'
			}
		}
	}
};

const productsTranslation = {
	en: {
		translation: {
			products: {
				label: 'Our Products',
				title: 'Explore our products',
				button: 'View all products'
			}
		}
	},
	ar: {
		translation: {
			products: {
				label: 'منتجاتنا',
				title: 'تصفح المنتجات',
				button: 'عرض جميع المنتجات'
			}
		}
	}
};

const featuredTranslation = {
	en: {
		translation: {
			featured: {
				label: 'Featured',
				title: 'New arrivals'
			}
		}
	},
	ar: {
		translation: {
			featured: {
				label: 'متميزة',
				title: 'المنتجات الجديدة'
			}
		}
	}
};

// Add breadcrumbs translations
const breadcrumbsTranslation = {
	en: {
		translation: {
			breadcrumbs: {
				'/': 'Home',
				products: 'Products',
				productId: '{{productId}}', // Will be replaced with actual product name
				account: 'Account',
				cart: 'Cart',
				wishlist: 'Wishlist'
			}
		}
	},
	ar: {
		translation: {
			breadcrumbs: {
				'/': 'الرئيسية',
				products: 'المنتجات',
				productId: '{{productId}}', // Will be replaced with actual product name
				account: 'حسابي',
				cart: 'سلة التسوق',
				wishlist: 'قائمة الرغبات'
			}
		}
	}
};

const prodcutIdPageTranslation = {
	en: {
		translation: {
			productIdPage: {
				reviews: 'Reviews',
				inStock: 'In Stock',
				colorsLabel: 'Colors:',
				buyNowButton: 'Buy Now',
				removeFromCartButton: 'Remove from Cart',
				freeDelivery: {
					title: 'Free Delivery',
					description: 'Enter your postal code to get free delivery'
				},
				returnDelivery: {
					title: 'Return Delivery',
					description: 'Free 30 days return policy'
				}
			}
		}
	},
	ar: {
		translation: {
			productIdPage: {
				reviews: 'من التقيمات',
				inStock: 'متوفر',
				colorsLabel: 'الألوان:',
				buyNowButton: 'اشترِ الآن',
				removeFromCartButton: 'ازالة من السلة',
				freeDelivery: {
					title: 'توصيل مجاني',
					description: 'أدخل الرمز البريدي للحصول على توصيل مجاني'
				},
				returnDelivery: {
					title: 'إرجاع مجاني',
					description: 'سياسة إرجاع مجانية لمدة 30 يومًا'
				}
			}
		}
	}
};

// Common translations
const cartTranslation = {
	en: {
		translation: {
			cart: {
				title: 'Cart',
				productName: 'Product Name',
				price: 'Price',
				quantity: 'Quantity',
				subtotal: 'Subtotal',
				cartTotal: 'Cart Total',
				total: 'Total',
				shipping: 'Shipping',
				free: 'Free',
				proceedToCheckout: 'Proceed to Checkout',
				returnToShop: 'Return to Shop',
				cartEmpty: 'Your cart is empty',
				productRemoved: '{{productName}} removed from cart',
				quantityUpdated: '{{productName}} quantity updated to {{quantity}}',
				updateError: 'Failed to update cart',
				removeError: 'Failed to remove item from cart'
			}
		}
	},
	ar: {
		translation: {
			cart: {
				title: 'سلة التسوق',
				productName: 'اسم المنتج',
				price: 'السعر',
				quantity: 'الكمية',
				subtotal: 'المجموع الفرعي',
				cartTotal: 'مجموع السلة',
				total: 'المجموع',
				shipping: 'الشحن',
				free: 'مجانا',
				proceedToCheckout: 'المتابعة للدفع',
				returnToShop: 'العودة للتسوق',
				cartEmpty: 'سلة التسوق فارغة',
				productRemoved: 'تمت إزالة {{productName}} من السلة',
				quantityUpdated: 'تم تحديث كمية {{productName}} إلى {{quantity}}',
				updateError: 'فشل تحديث السلة',
				removeError: 'فشل إزالة المنتج من السلة'
			}
		}
	}
};

const accountPageTranslation = {
	en: {
		translation: {
			accountNav: {
				title: 'My Account',
				profile: 'My Profile',
				orders: 'Orders',
				wishlist: 'Wishlist',
				'wishlist.title': 'My Wishlist',
				reviews: 'Reviews'
			},
			accountPage: {
				title: 'Account Management',
				profileTitle: 'Edit Your Profile'
			},
			formFields: {
				firstName: 'First Name',
				lastName: 'Last Name',
				email: 'Email',
				address: 'Address',
				passwordTitle: 'Change Password',
				password: 'Password',
				newPassword: 'New Password',
				confirmPassword: 'Confirm Password',
				buttons: {
					save: 'Save Changes',
					cancel: 'Cancel'
				}
			}
		}
	},
	ar: {
		translation: {
			accountNav: {
				title: 'حسابي',
				profile: 'الملف الشخصي',
				orders: 'الطلبات',
				wishlist: 'قائمة الرغبات',
				'wishlist.title': 'قائمة رغباتي',
				reviews: 'التقييمات'
			},
			accountPage: {
				title: 'ادارة الحساب',
				profileTitle: 'تعديل الملف الشخصي'
			},
			formFields: {
				firstName: 'الاسم الاول',
				lastName: 'الاسم الاخير',
				email: 'البريد الالكتروني',
				address: 'العنوان',
				passwordTitle: 'تغيير كلمة المرور',
				password: 'كلمة المرور',
				newPassword: 'كلمة المرور الجديدة',
				confirmPassword: 'تاكيد كلمة المرور',
				buttons: {
					save: 'حفظ التغييرات',
					cancel: 'الغاء'
				}
			}
		}
	}
};

const commonTranslation = {
	en: {
		translation: {
			common: {
				processing: 'Processing...',
				productAdded: 'Product {{productName}} added to cart',
				productError: 'Failed to add {{productName}} to cart'
			}
		}
	},
	ar: {
		translation: {
			common: {
				processing: 'جاري التحميل...',
				productAdded: 'تمت إضافة {{productName}} إلى السلة',
				productError: 'فشل إضافة {{productName}} إلى السلة'
			}
		}
	}
};

export const resources = {
	en: {
		translation: {
			language: 'English',
			dir: 'ltr',
			...headerTranslation['en'].translation,
			...heroTranslation['en'].translation,
			...timeTranslation['en'].translation,
			...todaysTranslation['en'].translation,
			...categoriesTranslation['en'].translation,
			...bestSellingTranslation['en'].translation,
			...productsTranslation['en'].translation,
			...featuredTranslation['en'].translation,
			...footerTranslation['en'].translation,
			...prodcutIdPageTranslation['en'].translation,
			...breadcrumbsTranslation['en'].translation,
			...wishlistTranslation['en'].translation,
			...commonTranslation['en'].translation,
			...cartTranslation['en'].translation,
			...accountPageTranslation['en'].translation
		}
	},
	ar: {
		translation: {
			language: 'العربية',
			dir: 'rtl',
			...headerTranslation['ar'].translation,
			...heroTranslation['ar'].translation,
			...timeTranslation['ar'].translation,
			...todaysTranslation['ar'].translation,
			...categoriesTranslation['ar'].translation,
			...bestSellingTranslation['ar'].translation,
			...productsTranslation['ar'].translation,
			...featuredTranslation['ar'].translation,
			...footerTranslation['ar'].translation,
			...prodcutIdPageTranslation['ar'].translation,
			...breadcrumbsTranslation['ar'].translation,
			...wishlistTranslation['ar'].translation,
			...commonTranslation['ar'].translation,
			...cartTranslation['ar'].translation,
			...accountPageTranslation['ar'].translation
		}
	}
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
		// you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
		// if you're using a language detector, do not define the lng option
		resources,
		fallbackLng: 'en'
	});

export default i18n;

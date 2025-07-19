// import the original type declarations
import "i18next";
// import all namespaces (for the default language, only)
import {resources} from "@/i18n";

declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: "en";
    // custom resources type
    resources: {
      en: typeof resources.en.translation;
      ar: typeof resources.ar.translation;
    };
    // other
  }
}
import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export const localePrefix = "never";
export const defaultLocale: Locale = "ar";

export const localeNames = {
  ar: "العربية",
  en: "English",
};

export const localeIcons = {
  ar: "/assets/ar.svg",
  en: "/assets/ar.svg",
};

export const { Link, usePathname, useRouter } = createSharedPathnamesNavigation(
  {
    locales,
    localePrefix,
  }
);

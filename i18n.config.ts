import { createSharedPathnamesNavigation } from "next-intl/navigation";
export const locales = ["ar", "en"] as const;
export const localePrefix = "never";
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
};

export const localeIcons: Record<Locale, string> = {
  ar: "/assets/ar.svg", // Path to your Arabic icon
  en: "/assets/ar.svg", // Path to your English icon
};

export const { Link, usePathname, useRouter } = createSharedPathnamesNavigation(
  { locales, localePrefix }
);

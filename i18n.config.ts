import { createSharedPathnamesNavigation } from "next-intl/navigation";
export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
};
export const { Link, usePathname, useRouter } = createSharedPathnamesNavigation(
  { locales }
);

"use client";

import {
  localeNames,
  locales,
  usePathname,
  useRouter,
  type Locale,
} from "@/i18n.config";

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  const changeLocale = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value as Locale;
    document.cookie = `NEXT_LOCALE=${newLocale}`;
    router.refresh();
  };

  return (
    <div className="rounded-2xl p-1 border-2 bg-[#DDEBFF]">
      <select value={locale} onChange={changeLocale} className="bg-[#DDEBFF]">
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeNames[loc]}
          </option>
        ))}
      </select>
    </div>
  );
}

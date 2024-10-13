"use client";

import { usePathname, useRouter, type Locale } from "@/i18n.config";
import { useState } from "react";

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const [icon, setIcon] = useState(
    locale == "en" ? "/assets/ar.png" : "/assets/en.png"
  );

  const changeLocale = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // const newLocale = event.target.value as Locale;
    // document.cookie = `NEXT_LOCALE=${newLocale}`;
    // router.refresh();
    const newLocale = event.target.value as Locale;
    if (newLocale === "en") {
      setIcon("/assets/en.png");
    } else if (newLocale === "ar") {
      setIcon("/assets/ar.png");
    }
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="selectWrapper">
      <img src={icon} alt="" className="selectedIcon" />
      <select value={locale} onChange={changeLocale} className="localeSelect">
        <option value="en">English</option>
        <option value="ar">العربية</option>
      </select>
    </div>
  );
}

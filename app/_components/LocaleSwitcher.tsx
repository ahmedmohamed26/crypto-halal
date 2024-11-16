"use client";

import { usePathname, useRouter, type Locale } from "@/i18n.config";
import { useState } from "react";

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const [icon, setIcon] = useState(
    locale == "en" ? "/assets/ar.png" : "/assets/en.png"
  );

  const changeLocale = (newLocale: any) => {
    if (newLocale === "en") {
      setIcon("/assets/en.png");
    } else if (newLocale === "ar") {
      setIcon("/assets/ar.png");
    }
    document.cookie = `NEXT_LOCALE=${newLocale}`;

    localStorage.setItem("NEXT_LOCALE", newLocale);
    router.push(pathname, { locale: newLocale });
  };

  return (
    <div className="selectWrapper">
      <div className="localeSelect border-[#ccc] border-[1px] p-1 rounded cursor-pointer">
        <img
          src={icon}
          alt=""
          className="selectedIcon"
          onClick={() => changeLocale(locale === "en" ? "ar" : "en")}
        />
      </div>
    </div>
  );
}

"use client";
import { Link, type Locale } from "@/i18n.config";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Logo from "../../public/assets/logo.svg";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale() as Locale;
  const pathName = usePathname();
  const navList = [
    {
      name: t("home"),
      href: "/",
    },
    {
      name: t("services"),
      href: "/services",
    },
    {
      name: t("visuals"),
      href: "/visuals",
    },
    {
      name: t("news"),
      href: "/news",
    },
    {
      name: t("studyAndResearch"),
      href: "/study-research",
    },
    {
      name: t("currencies"),
      href: "/currencies",
    },
    {
      name: t("contactUs"),
      href: "/contact",
    },
    {
      name: t("login"),
      href: "/login",
    },
  ];

  return (
    <header className="bg-white h-[100px] border-b-2 border-[#FFBB00] flex items-center">
      <div className="flex h-full items-center justify-between w-full container ">
        <div className="flex-1 md:flex md:items-center md:gap-12 ">
          <Link className="block text-teal-600" href="/">
            <span className="sr-only">Home</span>
            <Logo />
          </Link>
          <LocaleSwitcher locale={locale} />
        </div>

        <div className="md:flex md:items-center md:gap-12 h-full">
          <nav aria-label="Global" className="hidden md:block h-full">
            <ul className="flex items-center gap-6 justify-between h-full">
              {navList.map((link, ids) => (
                <>
                  <li
                    key={ids}
                    className="flex items-center h-full justify-between"
                  >
                    {pathName === link.href ? (
                      <Link
                        href={link.href}
                        className="text-[18px] text-primary border-b-2 border-primary flex items-center  h-full  justify-between"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <Link href={link.href} className="text-[18px] text-black">
                        {link.name}
                      </Link>
                    )}
                  </li>
                </>
              ))}
              <li>
                <Link
                  href="/register"
                  className="btn-yellow !text-[18px] font-regular !p-2"
                >
                  {t("subscribe")}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

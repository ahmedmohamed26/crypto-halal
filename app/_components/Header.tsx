"use client";
import { Link, type Locale } from "@/i18n.config";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
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
      href: "/about",
    },
    {
      name: t("news"),
      href: "/news",
    },
  ];
  return (
    <header className="bg-white container">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <a className="block text-teal-600" href="#">
              <span className="sr-only">Home</span>
            </a>
            <LocaleSwitcher locale={locale} />
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                {navList.map((link, ids) => (
                  <div key={ids}>
                    {pathName === link.href ? (
                      <Link
                        href={link.href}
                        className="text-lg font-semibold text-primary"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-lg font-semibold text-gray-600 duration-100 hover:text-primary"
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
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
      </div>
    </header>
  );
}

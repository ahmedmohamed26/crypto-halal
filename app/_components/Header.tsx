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
      subMenu: [
        {
          name: t("legitimacyCheck"),
          href: "/services#legitimacy-check",
        },
        {
          name: t("halalCryptoApp"),
          href: "/services#halal-cryptoApp",
        },
        {
          name: t("shariaSupervision"),
          href: "/services#sharia-supervision",
        },
        {
          name: t("forensicAudit"),
          href: "/services#forensic-audit",
        },
        {
          name: t("shariaStandards"),
          href: "/services#sharia-standards",
        },
        {
          name: t("media"),
          href: "/services#media",
        },
        {
          name: t("technicalAnalysis"),
          href: "/services#technical-analysis",
        },
      ],
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
                <li
                  key={ids}
                  className="flex items-center h-full justify-between relative group"
                >
                  <Link
                    href={link.href}
                    className={
                      pathName === link.href
                        ? "text-[18px] font-medium text-primary border-b-2 border-primary flex items-center h-full justify-between"
                        : "text-[18px] text-black font-medium"
                    }
                  >
                    {link.name}
                  </Link>
                  {link.subMenu && (
                    <div className="flex items-center">
                      <ul className="fixed w-[100vw] justify-center opacity-0 flex left-0 mt-[160px] z-10  bg-gray-700 p-4  group-hover:opacity-100 group-hover:flex space-x-4 transition-opacity   ease-in-out delay-200 bg-white">
                        {link.subMenu.map((subItem, index) => (
                          <li key={index} className="max-w-lg">
                            <a
                              href={subItem.href}
                              className="relative mx-4 py-2 text-black text-size18 font-medium"
                            >
                              {subItem.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
              <li>
                <Link
                  href="/register"
                  className={
                    pathName === "/register"
                      ? "btn-yellow !bg-primary !text-white !text-[18px] font-regular !p-2"
                      : "btn-yellow !text-[18px] font-regular !p-2"
                  }
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

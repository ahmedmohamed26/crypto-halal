"use client";
import { Link, type Locale } from "@/i18n.config";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "../../public/assets/logo.svg";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };
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

        <div className="md:flex md:items-center   h-full">
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

          <div className="flex items-center gap-4  lg:hidden">
            <div className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75">
              <button
                onClick={toggleMenu}
                className="text-gray-700 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            <div
              className={`fixed top-0 left-0 w-full h-screen bg-white z-50 transform transition-transform duration-300 ease-in-out ${
                isOpen
                  ? "opacity-100 translate-x-0 visible"
                  : "opacity-0 -translate-x-full invisible pointer-events-none"
              } lg:static lg:flex lg:bg-transparent lg:h-auto lg:w-auto lg:translate-x-0 lg:opacity-100 lg:visible`}
            >
              <button
                onClick={closeMenu}
                className="absolute top-4 right-4 text-gray-700 focus:outline-none lg:hidden"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <ul className="flex flex-col justify-center items-center space-y-8 h-full lg:flex-row lg:space-y-0 lg:space-x-6">
                {navList.map((link, ids) => (
                  <li key={ids}>
                    <Link
                      href={link.href}
                      className="text-[18px] text-black font-medium"
                      onClick={closeMenu}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

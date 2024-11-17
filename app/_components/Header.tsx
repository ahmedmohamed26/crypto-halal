"use client";
import { Link, type Locale } from "@/i18n.config";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "../_context/UserContext";
import LocaleSwitcher from "./LocaleSwitcher";
import ProfileDropdown from "./ProfileDD";
import axiosInstance from "../_lib/axios";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [dataService, setDataService] = useState<any>(null);
  const { isLoggedIn, user } = useUser();
  const t = useTranslations("Header");
  const locale = useLocale() as Locale;
  const pathName = usePathname();
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("services");
        setDataService(response.data.data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  const navList = [
    {
      name: t("home"),
      href: "/",
      active: true,
    },
    {
      name: t("services"),
      href: "/services",
      active: true,
      subMenu: dataService,
    },
    {
      name: t("visions"),
      href: "/visions",
      active: true,
    },
    {
      name: t("news"),
      href: "/news",
      active: true,
    },
    {
      name: t("studyAndResearch"),
      href: "/study-research",
      active: true,
    },
    {
      name: t("currencies"),
      href: "/currencies",
      active: true,
    },
    {
      name: t("contactUs"),
      href: "/contact",
      active: true,
    },
    {
      name: t("login"),
      href: "/login",
      active: isLoggedIn ? false : true,
    },
  ];
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    checkLoggedIn();
    setIsOpen(false);
  };

  const checkLoggedIn = () => {
    if (isLoggedIn) {
      router.push("/subscription");
    } else {
      router.push("/register");
    }
  };

  return (
    <header className="bg-white h-[100px] border-b-2 border-[#FFBB00] flex items-center fixed top-0  left-0 w-full   shadow-md z-50">
      <div className="flex h-full items-center justify-between w-full container ">
        <div className="flex items-center gap-4">
          {isLoggedIn && <ProfileDropdown />}

          <Link className="block text-teal-600" href="/">
            <span className="sr-only">Home</span>
            <img src="/assets/logo.svg" alt="logo" />
          </Link>
          <LocaleSwitcher locale={locale} />
        </div>

        <div className="flex items-center h-full">
          <nav aria-label="Global" className="hidden lg:block h-full">
            <ul className="flex items-center gap-6 justify-between h-full">
              {navList.map(
                (link, ids) =>
                  link.active === true && (
                    <li
                      key={ids}
                      className="flex items-center h-full justify-between relative group"
                    >
                      <Link
                        href={link.href}
                        prefetch
                        className={
                          pathName === link.href
                            ? "-mb-1 xl:text-size18 lg:text-[13px] text-size14 font-regular text-primary border-b-4 border-primary flex items-center h-full justify-between"
                            : "xl:text-size18 lg:text-[13px] text-size14 text-black font-regular"
                        }
                      >
                        {link.name}
                      </Link>
                      {link.subMenu && (
                        <div className="flex items-center">
                          <ul
                            className={`${
                              pathName === link.href
                                ? "flex fixed w-full justify-center opacity-1 left-0 mt-[160px] z-10  bg-gray-700 p-4  group-hover:opacity-100 group-hover:flex space-x-4 transition-opacity   ease-in-out delay-400 bg-white flex-wrap"
                                : "hidden fixed w-full justify-center opacity-0  left-0 mt-[160px] z-10  bg-gray-700 p-4  group-hover:opacity-100 group-hover:flex space-x-4 transition-opacity   ease-in-out delay-400 bg-white flex-wrap "
                            }  `}
                          >
                            {link?.subMenu?.map(
                              (subItem: any, index: number) => (
                                <li key={index} className="max-w-lg">
                                  <a
                                    href={`/services#${subItem.id}`}
                                    className="relative mx-1 py-2 text-black xl:text-size18 lg:text-size14 text-size14 font-regular"
                                  >
                                    {subItem.name}
                                  </a>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </li>
                  )
              )}

              {(user?.subscribe_flag || !isLoggedIn) && (
                <li>
                  <button
                    onClick={checkLoggedIn}
                    className={
                      pathName === "/register" || pathName === "/subscription"
                        ? "btn-yellow !bg-primary !text-white xl:text-size18 lg:text-[13px] text-size14 font-regular !p-2"
                        : "btn-yellow xl:text-size18 lg:text-[13px] text-size14 font-regular !p-2"
                    }
                  >
                    {t("subscribe")}
                  </button>
                </li>
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-4 lg:hidden">
            <div className="block rounded bg-gray-100 pt-3.5 text-gray-600 transition hover:text-gray-600/75">
              <button
                onClick={toggleMenu}
                className="text-gray-700 focus:outline-none mb-4"
              >
                <img src="/assets/menu.svg" alt="menu" />
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
                {navList.map(
                  (link, ids) =>
                    link.active === true && (
                      <li key={ids}>
                        <Link
                          href={link.href}
                          prefetch
                          className="text-[16px] text-black font-regular"
                          onClick={closeMenu}
                        >
                          {link.name}
                        </Link>
                      </li>
                    )
                )}

                {user?.subscribe_flag && (
                  <li>
                    <button
                      className="text-[16px] text-black font-regular"
                      onClick={closeMenu}
                    >
                      {t("subscribe")}
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

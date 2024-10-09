import { useTranslations } from "next-intl";
import Link from "next/link";
import Email from "../../public/assets/email.svg";
import Facebook from "../../public/assets/facebook.svg";
import instagram from "../../public/assets/instagram.svg";
import linkedin from "../../public/assets/linkedIn.svg";
import twitter from "../../public/assets/x.svg";
import youtube from "../../public/assets/youtube.svg";

function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("Footer");
  const socialMediaList = [
    {
      src: youtube,
      url: "/",
    },
    {
      src: linkedin,
      url: "/",
    },
    {
      src: twitter,
      url: "/",
    },
    {
      src: instagram,
      url: "/",
    },
    {
      src: Facebook,
      url: "/",
    },
  ];
  return (
    <footer className="bg-[#06102B] text-white">
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
          <div>
            <h3 className="text-size20 mb-[1.5rem]">{t("app-name")}</h3>
            <p>{t("description")}</p>
          </div>

          <div>
            <ul className="text-size18 space-y-4">
              <li>
                <Link href="/">{t("home")}</Link>
              </li>

              <li>
                <Link href="/services">{t("services")}</Link>
              </li>
              <li>
                <Link href="/visuals">{t("visuals")}</Link>
              </li>
              <li>
                <Link href="/news">{t("news")}</Link>
              </li>
              <li>
                <Link href="/study-research">{t("studyAndResearch")}</Link>
              </li>
              <li>
                <Link href="/currencies">{t("currencies")}</Link>
              </li>
              <li>
                <Link href="/contact">{t("contactUs")}</Link>
              </li>
            </ul>
          </div>

          <div>
            <ul className="text-size18 space-y-4">
              <li>
                <Link href="/">{t("termsOfUse")}</Link>
              </li>

              <li>
                <Link href="/">{t("privacyPolicy")}</Link>
              </li>
              <li>
                <Link href="/">{t("termsAndConditions")}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-size20 mb-[1.5rem]">{t("subscribeToMail")}</h3>
            <p>{t("subscribeNews")}</p>

            <div className="relative mt-[1.5rem]">
              <input
                type="email"
                id="UserEmail"
                placeholder={t("addEmail")}
                className="w-full rounded-md  shadow-sm sm:text-sm h-[50px] text-black indent-2.5 !outline-none"
              />

              <span className="pointer-events-none absolute top-[19px] end-0 grid w-10 place-content-center text-black">
                <Email width={20} height={20} />
              </span>
            </div>
            <div className="flex justify-end mt-4">
              <button className="inline-block rounded border   bg-[#FFBB00] px-6 py-3  text-primary text-[16px] focus:outline-none focus:ring">
                {t("subscribe")}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-16  pt-8 sm:flex sm:items-center sm:justify-between lg:mt-24">
          <div className="flex flex-wrap justify-center gap-4 text-xs lg:justify-end">
            <p className="text-size16">
              {t("copyRight")}
              {currentYear}
            </p>
          </div>
          <ul className="mt-8 flex justify-center gap-6 sm:mt-0 lg:justify-end">
            {socialMediaList.map((link, index) => {
              const IconComponent = link.src;

              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconComponent />
                </a>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

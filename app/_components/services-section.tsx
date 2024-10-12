"use client";
import { Locale } from "@/i18n.config";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import AliceCarousel from "react-alice-carousel";
const ServicesSection = () => {
  const t = useTranslations("Home");
  const locale = useLocale() as Locale;
  const data = [
    { number: 1500, label: t("workTeam") },
    { number: 2500, label: t("tests") },
    { number: 1200, label: t("subscribers") },
    { number: 5200, label: t("projects") },
  ];

  const teamListResponsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  const partnersListResponsive = {
    0: { items: 2 },
    568: { items: 2 },
    1024: { items: 5 },
  };
  const teamsListLength = Array.from({ length: 5 });

  const teamsList = teamsListLength.map((item, index) => {
    const style = { height: 200 + index * 10 };
    return (
      <div
        className="item group block bg-white p-4 mx-2"
        data-value={index + 1}
        dir={locale == "en" ? "rtl" : "ltr"}
      >
        <img
          src="assets/mock-image.png"
          alt=""
          className="w-full rounded object-cover"
          width={150}
          height={200}
          loading="lazy"
        />

        <div className="mt-3 flex justify-between items-center">
          <img
            src="assets/logo-base.svg"
            alt=""
            className="object-cover"
            width={50}
            height={50}
            loading="lazy"
          />
          <div>
            <h3 className="text-primary text-size22 font-regular mb-1">
              دكتور حسين عبد الكريم
            </h3>

            <p className="text-yellow text-size16 font-regular text-end">
              مسئول فريق البحث
            </p>
          </div>
        </div>
      </div>
    );
  });

  const partnersList = teamsListLength.map((item, index) => {
    return (
      <div
        className="item group block bg-white p-4 mx-2"
        data-value={index + 1}
        dir={locale == "en" ? "rtl" : "ltr"}
      >
        <img
          src={`assets/partners/partner${index + 1}.svg`}
          alt=""
          className="w-full border border-[#f3f3f3] rounded object-cover shadow-md p-4"
          width={150}
          height={200}
        />
      </div>
    );
  });

  return (
    <>
      <section className="services py-8">
        <div className="container">
          <div className="flex justify-center items-center bg-[#F1F7FD] p-[2rem] relative z-[2222]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-6xl text-center">
              {data.map((item, index) => (
                <div key={index} className="p-4 relative">
                  <h2 className="text-[40px] md:text-[80px] font-bold text-yellow opacity-50">
                    {index !== data.length - 1 && (
                      <div className="sm:hidden md:block md:absolute w-[2px] h-full bg-black end-px top-0"></div>
                    )}
                    {item.number}
                  </h2>
                  <p className="text-sm  lg:text-2xl font-semibold text-gray-600 absolute inset-0 m-auto h-[30px]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* services  */}

        <div className="w-full relative bg-[#0B2962]  mt-[-105px]">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 text-center pt-[250px] container">
            <div className="flex items-center  flex-col order-2 md:order-1">
              <h4 className="text-white text-[50px] mb-[3rem]">
                {t("visualReleases")}
              </h4>
              <p className="w-[75%] text-white text-[28px] mb-[2rem]">
                {t("visualReleasesDescription")}
              </p>
              <Link
                href="/visuals"
                className="rounded bg-[#FFBB00] px-6 py-3 text-black text-[16px] cursor-pointer"
              >
                {t("more")}
              </Link>
            </div>
            <div className="w-full flex items-center justify-center flex-col order-1 md:order-2">
              <img
                loading="lazy"
                src="assets/visual-releases.svg"
                width={400}
                height={400}
              />
            </div>
          </div>

          <div className=" grid lg:grid-cols-2 grid-cols-1 gap-4 text-center pt-[250px] container">
            <div className="w-full flex items-center justify-center">
              <img
                loading="lazy"
                src="assets/crypto-education.svg"
                width={500}
                height={500}
              />
            </div>
            <div className="flex items-center flex-col">
              <h4 className="text-white text-[50px] mb-[3rem]">
                {t("studiesAndResearch")}
              </h4>
              <p className="w-[75%] text-white text-[28px] mb-[2rem]">
                {t("studiesAndResearchDescription")}
              </p>
              <Link
                href="/study-research"
                className="rounded bg-[#FFBB00] px-6 py-3 text-black text-[16px] cursor-pointer"
              >
                {t("more")}
              </Link>
            </div>
          </div>

          <div className=" grid lg:grid-cols-2 grid-cols-1 gap-4 text-center py-[200px] container">
            <div className="flex items-center flex-col order-2 md:order-1">
              <h4 className="text-white text-[50px] mb-[3rem]">{t("news")}</h4>
              <p className="w-[75%] text-white text-[28px] mb-[2rem]">
                {t("newsDescription")}
              </p>
              <Link
                href="/news"
                className="rounded bg-[#FFBB00] px-6 py-3 text-black text-[16px] cursor-pointer"
              >
                {t("more")}
              </Link>
            </div>
            <div className="w-full flex items-center justify-center order-1 md:order-2">
              <img
                loading="lazy"
                src="assets/news.svg"
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>
        <section
          className="work-team py-16"
          style={{
            background:
              "linear-gradient(-135deg, #62798b 0%, #62798b 72%, #0B2962 50%, #0B2962 100%)",
          }}
        >
          <h3 className=" text-center text-white text-size22 md:text-[66px] font-semibold mb-[50px] md:mb-[100px]">
            {t("workTeam")}
          </h3>
          <div className="container">
            <AliceCarousel
              mouseTracking
              items={teamsList}
              responsive={teamListResponsive}
              controlsStrategy="responsive"
              disableDotsControls
              disableButtonsControls
              infinite
              autoPlay
              autoPlayInterval={2000}
              animationDuration={2000}
              autoPlayDirection={locale == "ar" ? "rtl" : "ltr"}
            />
          </div>
        </section>
      </section>

      <section className="partners py-8">
        <h3 className=" text-center text-black text-size22 md:text-[66px] font-semibold mb-[2rem] md:mb-[4rem]">
          {t("partners")}
        </h3>
        <div className="container">
          <AliceCarousel
            mouseTracking
            items={partnersList}
            responsive={partnersListResponsive}
            controlsStrategy="responsive"
            disableDotsControls
            disableButtonsControls
            infinite
            autoPlay
            autoPlayInterval={2000}
            animationDuration={2000}
            autoPlayDirection={locale == "ar" ? "rtl" : "ltr"}
          />
        </div>
      </section>
    </>
  );
};

export default ServicesSection;

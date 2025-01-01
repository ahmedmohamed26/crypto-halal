"use client";
import { Locale } from "@/i18n.config";
import DOMPurify from "isomorphic-dompurify";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const ServicesSection = ({ sponsors, teams, info }: any) => {
  const t = useTranslations("Home");
  const locale = useLocale() as Locale;
  const data = [
    { number: info?.teams, label: t("workTeam") },
    { number: info?.tests, label: t("tests") },
    { number: info?.subscribers, label: t("subscribers") },
    { number: info?.projects, label: t("projects") },
  ];
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

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

  const teamsList = teams?.map((item: any, index: number) => {
    return (
      <div
        className="item group block bg-white p-4 mx-2"
        data-value={index}
        dir={locale == "en" ? "rtl" : "ltr"}
      >
        <img
          src={item?.image}
          alt={item?.name}
          className="w-full h-72 rounded object-fill"
          loading="lazy"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          draggable={false}
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
            <h3 className="text-primary text-[17px] font-regular mb-1">
              {item?.name}
            </h3>

            <p className="text-yellow text-size14 font-regular text-end">
              {item?.job}
            </p>
          </div>
        </div>
      </div>
    );
  });

  const partnersList = sponsors?.map((item: any, index: number) => {
    return item?.link ? (
      <Link
        href={item?.link}
        target="_blank"
        className="item group block  border-1 border-[#ddd] shadow-md p-4 mx-2"
        data-value={index}
        dir={locale == "en" ? "rtl" : "ltr"}
      >
        <img
          src={item?.image}
          alt={item?.name}
          className="w-full h-[200px] rounded object-fill"
          loading="lazy"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          draggable={false}
        />
      </Link>
    ) : (
      <div
        className="item group block border-1 border-[#ddd] shadow-md p-4 mx-2 cursor-not-allowed"
        data-value={index}
        dir={locale == "en" ? "rtl" : "ltr"}
      >
        <img
          src={item?.image}
          alt={item?.name}
          className="w-full h-[200px] rounded object-fill"
          loading="lazy"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          draggable={false}
        />
      </div>
    );
  });

  return (
    <>
      <section className="services pt-8">
        <div className="container">
          <div className="flex justify-center items-center bg-[#F1F7FD] p-[2rem] relative z-10">
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

        <div
          className="w-full relative bg-primary mt-[-105px]"
          style={{
            background:
              "linear-gradient(140deg, rgba(26,81,154,1) 0%, rgba(16,36,73,1) 25%, rgba(28,74,112,1) 100%)",
          }}
        >
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 text-center pt-[250px] container">
            <div className="flex items-center  flex-col order-2 md:order-1">
              <h4 className="text-white text-[50px] mb-[3rem]">
                {t("visualReleases")}
              </h4>
              <p className="w-[75%] text-white text-[28px] mb-[2rem]">
                <span
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      info?.vision.replace(/&nbsp;/g, "<br/>"),
                      {
                        USE_PROFILES: { html: true },
                      }
                    ),
                  }}
                />
              </p>

              <Link
                href="/visions"
                className="rounded bg-[#FFBB00] px-6 py-3 text-black text-[16px] cursor-pointer"
                prefetch={false}
              >
                {t("more")}
              </Link>
            </div>
            <div className="w-full flex items-center justify-center flex-col order-1 md:order-2">
              <img
                loading="lazy"
                src="assets/visions.svg"
                alt="visions"
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
                alt="research"
                width={500}
                height={500}
              />
            </div>
            <div className="flex items-center flex-col">
              <h4 className="text-white text-[50px] mb-[3rem]">
                {t("studiesAndResearch")}
              </h4>
              <p className="w-[75%] text-white text-[28px] mb-[2rem]">
                <span
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      info?.research.replace(/&nbsp;/g, "<br/>"),
                      {
                        USE_PROFILES: { html: true },
                      }
                    ),
                  }}
                />
              </p>

              <Link
                href="/study-research"
                prefetch={false}
                className="rounded bg-[#FFBB00] px-6 py-3 text-black text-[16px] cursor-pointer"
              >
                {t("more")}
              </Link>
            </div>
          </div>

          <div className=" grid lg:grid-cols-2 grid-cols-1 gap-4 text-center pt-[250px] container">
            <div className="flex items-center flex-col order-2 md:order-1">
              <h4 className="text-white text-[50px] mb-[3rem]">{t("news")}</h4>
              <p className="w-[75%] text-white text-[28px] mb-[2rem]">
                <span
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      info?.news.replace(/&nbsp;/g, "<br/>"),
                      {
                        USE_PROFILES: { html: true },
                      }
                    ),
                  }}
                />
              </p>

              <Link
                href="/news"
                prefetch={false}
                className="rounded bg-[#FFBB00] px-6 py-3 text-black text-[16px] cursor-pointer"
              >
                {t("more")}
              </Link>
            </div>
            <div className="w-full flex items-center justify-center order-1 md:order-2">
              <img
                loading="lazy"
                src="assets/news.svg"
                alt="news"
                width={400}
                height={400}
              />
            </div>
          </div>

          <div className=" grid lg:grid-cols-2 grid-cols-1 gap-4 text-center py-[200px] container">
            <div className="w-full flex items-center justify-center">
              <img
                loading="lazy"
                src="assets/controlAndAuditReports.svg"
                alt="research"
                width={500}
                height={500}
              />
            </div>
            <div className="flex items-center flex-col">
              <h4 className="text-white text-[50px] mb-[3rem]">
                {t("controlAndAuditReports")}
              </h4>
              <Link
                href="/control-and-reports"
                prefetch={false}
                className="rounded bg-[#FFBB00] px-6 py-3 text-black text-[16px] cursor-pointer"
              >
                {t("more")}
              </Link>
            </div>
          </div>
        </div>

        <section
          className="work-team pt-16 pb-20"
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
              onSlideChanged={() => setIsDragging(false)}
            />
          </div>
        </section>
      </section>

      <section className="partners pt-8 pb-16 bg-[#F1F7FD]">
        <h3 className=" text-center text-black text-size22 md:text-[66px] font-semibold mb-[2rem] md:mb-[4rem] mt-4">
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
            onSlideChanged={() => setIsDragging(false)}
          />
        </div>
      </section>
    </>
  );
};

export default ServicesSection;

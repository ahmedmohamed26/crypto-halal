import { useTranslations } from "next-intl";
import ServicesSection from "../_components/services-section";
import Link from "next/link";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <div>
      <div className="w-full relative bg-[#F1F7FD] pt-[5%]">
        <div className='bg-[url("../../public/assets/intro.png")] bg-no-repeat bg-cover aspect-[4/3] w-full'>
          <div className="container">
            <h1 className="text-primary md:text-[5rem] text-[2rem]">
              {t("appName")}
            </h1>
            <p className="text-black text-[2rem] font-semibold w-[50%] mt-[3rem]">
              {t("description")}
            </p>
            <div className="mt-[3rem]">
              <Link
                href="/"
                className="inline-block rounded bg-[#FFBB00] px-6 py-3 font-medium text-primary text-size24 focus:outline-none focus:ring"
              >
                {t("subscribe")}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-white relative mt-[-250px] pb-12">
        <div
          className="container"
          style={{
            boxShadow: "-1px -27px 71px 35px rgba(255,255,255,1)",
          }}
        >
          <h3 className="text-black md:text-[3rem] text-[1.5rem] font-semibold">
            {t("whatIsCrypto")}
          </h3>
          <p className="font-medium text-[28px] text-black mt-[1rem]">
            {t("whatIsCryptoDesc")}
          </p>
        </div>
      </div>

      {/* services section */}

      <section className="services  py-8">
        <div className="flex justify-end mt-4 container">
          <div className=" rounded bg-[#FFBB00] px-8 py-2 font-medium text-black text-[20px]">
            {t("services")}
          </div>
        </div>
        <div className="container">
          <ServicesSection />
        </div>

        {/* services list */}

        <div className="w-full relative bg-[#0B2962]  mt-[-105px] z-[-1] ">
          <div className=" grid lg:grid-cols-2 grid-cols-1 gap-4 text-center pt-[250px] container">
            <div className="flex items-center  flex-col">
              <h4 className="text-white text-[50px] mb-[3rem]">
                {t("visualReleases")}
              </h4>
              <p className="w-[75%] text-white text-[28px] mb-[2rem]">
                {t("visualReleasesDescription")}
              </p>
              <Link
                href="/"
                className="rounded bg-[#FFBB00] px-6 py-3 text-black text-[16px] cursor-pointer"
              >
                {t("more")}
              </Link>
            </div>
            <div className="w-full flex items-center justify-center">
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
                href="/"
                className="rounded bg-[#FFBB00] px-6 py-3 text-black text-[16px] cursor-pointer"
              >
                {t("more")}
              </Link>
            </div>
          </div>

          <div className=" grid lg:grid-cols-2 grid-cols-1 gap-4 text-center py-[200px] container">
            <div className="flex items-center flex-col">
              <h4 className="text-white text-[50px] mb-[3rem]">{t("news")}</h4>
              <p className="w-[75%] text-white text-[28px] mb-[2rem]">
                {t("newsDescription")}
              </p>
              <Link
                href="/"
                className="rounded bg-[#FFBB00] px-6 py-3 text-black text-[16px] cursor-pointer"
              >
                {t("more")}
              </Link>
            </div>
            <div className="w-full flex items-center justify-center">
              <img
                loading="lazy"
                src="assets/news.svg"
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

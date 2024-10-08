import { useTranslations } from "next-intl";
import Link from "next/link";
import ServicesSection from "../_components/services-section";

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

      <section className="services container py-8">
        <div className="flex justify-end mt-4">
          <div className=" rounded bg-[#FFBB00] px-8 py-2 font-medium text-black text-[20px]">
            {t("services")}
          </div>
        </div>
        <ServicesSection />
      </section>
    </div>
  );
}

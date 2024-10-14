"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import ServicesSection from "../_components/services-section";
import axiosInstance from "../_lib/axios";
import DOMPurify from "isomorphic-dompurify";

export default function Home() {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("home");
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const t = useTranslations("Home");
  // useEffect(() => {
  //   const styleSheet = document.styleSheets[0];
  //   const keyframes = `
  //     @keyframes fadeInBottom {
  //       0% {
  //         opacity: 0;
  //         transform: translateY(50px);
  //       }
  //       100% {
  //         opacity: 1;
  //         transform: translateY(0);
  //       }
  //     }`;

  //   styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  // }, []);
  return (
    <div>
      <div className="w-full relative bg-[#F1F7FD] pt-[10%]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="container">
            <h1 className="text-primary md:text-[5rem] text-[2rem] font-bold md:container">
              {t("appName")}
            </h1>
            <p className="text-black md:text-[2rem] text-[1rem] font-semibold   mt-[3rem] md:container">
              {t("description")}
            </p>
            <div className="mt-[3rem] md:container">
              <Link
                href="/"
                className="rounded bg-[#FFBB00] px-6 py-3 font-medium text-primary text-size24"
              >
                {t("subscribe")}
              </Link>
            </div>
          </div>
          <div className="h-[100vh] relative w-full  overflow-hidden hidden md:block">
            <img
              src="assets/intro.svg"
              alt=""
              style={{
                width: "100%",
                height: "auto",
                animation: "fadeInBottom 1.5s ease-out forwards",
              }}
            />
          </div>
        </div>
      </div>
      <div className=" bg-white relative md:mt-[-200px] mt-20 pb-12">
        <div
          className="container"
          style={{
            boxShadow: "-1px -27px 71px 35px rgba(255,255,255,1)",
          }}
        >
          <h3 className="text-black md:text-[3rem] text-[1.5rem] font-semibold">
            {t("whatIsCrypto")}
          </h3>
          <p className="font-medium text-[14px] md:text-[28px] text-black mt-[1rem]">
            {DOMPurify.sanitize(data?.info?.about, {
              USE_PROFILES: { html: false },
            })}
          </p>
        </div>
      </div>

      {/* services section */}

      <section className="services  py-8">
        <div className="flex justify-center  md:justify-end mt-4 container">
          <div className=" rounded bg-[#FFBB00] px-8 py-2 font-medium text-black text-[20px]">
            {t("services")}
          </div>
        </div>

        <ServicesSection
          sponsors={data?.sponsors}
          teams={data?.teams}
          info={data?.info}
        />
      </section>
    </div>
  );
}

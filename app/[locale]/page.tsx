"use client";
import { Locale } from "@/i18n.config";
import DOMPurify from "isomorphic-dompurify";
import { useLocale, useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "../_context/UserContext";
import axiosInstance from "../_lib/axios";

const ServicesSection = dynamic(
  () => import("../_components/services-section")
);

export default function Home() {
  const [data, setData] = useState<any>(null);
  const { isLoggedIn, user } = useUser();
  const locale = useLocale() as Locale;
  const router = useRouter();
  // const [country, setCountry] = useState<string>("Unknown");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("home");
        setData(response.data.data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  // async function findCountry(lat: number, lon: number) {
  //   try {
  //     const resp = await fetch(
  //       `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
  //     );
  //     const data = await resp.json();
  //     return data?.address?.country ?? "Unknown";
  //   } catch (e) {
  //     console.error("Error fetching country:", e);
  //     return "Unknown";
  //   }
  // }

  // useEffect(() => {
  //   const getCountry = async () => {
  //     if ("geolocation" in navigator) {
  //       navigator.geolocation.getCurrentPosition(
  //         async (position) => {
  //           const lat = position.coords.latitude;
  //           const lon = position.coords.longitude;
  //           const detectedCountry = await findCountry(lat, lon);
  //           setCountry(detectedCountry);
  //           console.log(country);
  //         },
  //         (error) => {
  //           console.error("Error getting user location:", error);
  //           setCountry("Unknown");
  //         }
  //       );
  //     } else {
  //       console.error("Geolocation is not supported by this browser.");
  //       setCountry("Unknown");
  //     }
  //   };

  //   getCountry();
  // }, []);

  const t = useTranslations("Home");

  const checkLoggedIn = () => {
    if (isLoggedIn) {
      router.push("/subscription");
    } else {
      router.push("/register");
    }
  };

  return (
    <div>
      <div className="w-full relative bg-[#F1F7FD] pt-[10%]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="container  ps-[10%] md:ps-[20%]">
            <h1 className="text-primary md:text-[5rem] text-[2rem] font-regular">
              {t("appName")}
            </h1>
            <p className="text-black md:text-[28px] text-[1rem] font-medium mt-[3rem]">
              {t("description")}
            </p>
            {(user?.subscribe_flag || !isLoggedIn) && (
              <div className="mt-[3rem]">
                <button
                  onClick={checkLoggedIn}
                  className="rounded bg-[#FFBB00] px-6 py-3 font-regular text-primary text-size24"
                >
                  {t("subscribe")}
                </button>
              </div>
            )}
          </div>
          {locale === "ar" ? (
            <div className='bg-[url("/assets/intro.svg")] bg-no-repeat  aspect-[6/5] w-full bg-contain'></div>
          ) : (
            <div className='bg-[url("/assets/intro.svg")] bg-no-repeat  aspect-[6/5] w-full scale-x-[-1] bg-contain'></div>
          )}
        </div>
      </div>
      <div className=" bg-white relative xl:mt-[-180px] mt-20 pb-12">
        <div
          className="container"
          style={{
            boxShadow: "-1px -27px 71px 35px rgba(255,255,255,1)",
          }}
        >
          <h3 className="text-black md:text-[3rem] text-[1.5rem] font-semibold">
            {t("whatIsCrypto")}
          </h3>
          <p className="font-regular text-[14px] md:text-[24px] text-black mt-[1rem]">
            {DOMPurify.sanitize(data?.info?.about.replace(/&nbsp;/g, " "), {
              USE_PROFILES: { html: false },
            })}
          </p>
        </div>
      </div>

      {/* services section */}

      <section className="services bg-white pt-8">
        <div className="flex justify-center  md:justify-end mt-4 container">
          <Link
            href="/services"
            prefetch={false}
            className=" rounded bg-[#FFBB00] px-8 py-2 font-regular text-black text-[20px]"
          >
            {t("services")}
          </Link>
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

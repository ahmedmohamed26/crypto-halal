import { useTranslations } from "next-intl";
import Link from "next/link";
import ServicesSection from "../_components/services-section";

export default function Home() {
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
        <div className="grid grid-cols-2">
          <div className="container">
            <h1 className="text-primary md:text-[5rem] text-[2rem] font-bold container">
              {t("appName")}
            </h1>
            <p className="text-black text-[2rem] font-semibold   mt-[3rem] container">
              {t("description")}
            </p>
            <div className="mt-[3rem] container">
              <Link
                href="/"
                className="rounded bg-[#FFBB00] px-6 py-3 font-medium text-primary text-size24"
              >
                {t("subscribe")}
              </Link>
            </div>
          </div>
          <div className="h-[100vh] relative w-full  overflow-hidden">
            <img
              src="assets/intro.svg"
              alt=""
              style={{
                width: "100%",
                height: "auto",
                // opacity: 0, // Initial opacity
                animation: "fadeInBottom 1.5s ease-out forwards", // Use the keyframes
              }}
            />
          </div>
        </div>
      </div>
      <div className=" bg-white relative mt-[-200px] pb-12">
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

        <ServicesSection />
      </section>
    </div>
  );
}

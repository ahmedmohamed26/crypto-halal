import Card from "@/app/_components/card";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Facebook from "../../../../public/assets/facebook.svg";
import instagram from "../../../../public/assets/instagram.svg";
import linkedin from "../../../../public/assets/linkedIn.svg";
import twitter from "../../../../public/assets/x.svg";
import "./style.css";

function StudyResearchDetails({ params }: { params: { id: string } }) {
  const relatedVideosListLength = Array.from({ length: 4 });
  const t = useTranslations("Visuals");
  const socialMediaList = [
    {
      src: instagram,
      url: "/",
    },
    {
      src: twitter,
      url: "/",
    },
    {
      src: Facebook,
      url: "/",
    },
    {
      src: linkedin,
      url: "/",
    },
  ];
  return (
    <section className="py-24 container">
      <h1 className="text-primary text-[38px] font-medium  mb-4">
        نقدية العملات المشفرة واثرهافي بيان حكمها الشرعي
      </h1>
      <div className="flex items-center">
        <span className="text-[#475467] text-size16 font-medium">
          11 اكتوبر 2023
        </span>
        <div className="flex items-center ms-3">
          <img alt="" src="/assets/clock.svg" className="mx-2" />
          <span className="text-size16 font-medium text-darkGray">10 د</span>
        </div>

        <div className="flex items-center ms-3">
          <img alt="" src="/assets/eye.svg" className="mx-2" width={22} />
          <span className="text-size16 font-medium text-darkGray">440</span>
        </div>
      </div>
      <div className="flex items-center justify-start mt-4">
        <img
          alt=""
          src="/assets/mock-image.png"
          className="h-12 w-12 object-cover rounded-full"
        />
        <h6 className="text-size22 font-medium text-yellow mx-4">
          أ.د / محمد علي
        </h6>
      </div>

      <div className="video-container mt-16"></div>

      <div className="related-videos mt-16">
        <div className="flex items-center justify-between">
          <h3 className=" text-[28px] text-black font-medium">
            {t("watchMore")}
          </h3>
          <Link href="/visuals" className="btn-yellow !text-size22">
            <span>{t("more")}</span>
          </Link>
        </div>

        <ul className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-8 pt-16">
          {relatedVideosListLength.map((item, index) => (
            <li key={index}>
              <Link href={`visuals/${1}`}>
                <Card
                  img={`/assets/study-and-research.svg`}
                  title={"نقدية العملات المشفرة واثرها و حكمها الشرعي"}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="comments lg:flex block items-end justify-between mt-32">
        <div className="bg-[#EAF1FA] p-4 w-full lg:w-[60%] rounded-md max-[600px]:mb-4">
          <div className="flex items-center justify-between">
            <h3 className=" text-[28px] text-black font-medium ">
              {t("comment")}
            </h3>
            <button className="btn-yellow !text-size22 !px-6 !py-2">
              <span>{t("publish")}</span>
            </button>
          </div>
          <textarea
            id="message"
            rows={7}
            className="mt-4 w-full rounded-md  shadow-sm sm:text-sm  text-black  indent-2.5 !outline-none resize-none"
          />
        </div>

        <div className="share">
          <h3 className=" text-size24 text-primary font-medium mb-6">
            {t("share")}
          </h3>
          <ul className="flex justify-center gap-6 sm:mt-0 lg:justify-end">
            {socialMediaList.map((link, index) => {
              const IconComponent = link.src;
              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-link"
                >
                  <IconComponent />
                </a>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default StudyResearchDetails;

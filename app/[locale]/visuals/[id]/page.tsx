"use client";
import Card from "@/app/_components/card";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import Facebook from "../../../../public/assets/facebook.svg";
import instagram from "../../../../public/assets/instagram.svg";
import linkedin from "../../../../public/assets/linkedIn.svg";
import twitter from "../../../../public/assets/x.svg";
import "./style.css";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/_lib/axios";

function VisualDetails({ params }: { params: { id: string } }) {
  const [visualDetails, setVisualDetails] = useState<any>({});
  const videosListLength = Array.from({ length: 2 });
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`visions/${params.id}`);
        setVisualDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-24 container">
      <h1 className="text-primary text-size22 md:text-[38px] font-medium  mb-4">
        {visualDetails?.title}
      </h1>
      <div className="flex items-center">
        <span className="text-[#475467] text-size16 font-medium">
          {visualDetails?.date}
        </span>
        <div className="flex items-center ms-3">
          <img alt="" src="/assets/clock.svg" className="mx-2" />
          <span className="text-size16 font-medium text-darkGray">
            {visualDetails?.duration}
          </span>
        </div>

        <div className="flex items-center ms-3">
          <img alt="" src="/assets/eye.svg" className="mx-2" width={22} />
          <span className="text-size16 font-medium text-darkGray">
            {visualDetails?.views}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-start mt-4">
        <img
          alt=""
          src={visualDetails?.lecturer?.image}
          className="h-12 w-12 object-cover rounded-full"
        />
        <h6 className="text-size22 font-medium text-yellow mx-4">
          {visualDetails?.lecturer?.name}
        </h6>
      </div>

      <div className="video-container mt-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="hidden md:block">
            <ul>
              {videosListLength.map((_, index) => (
                <li key={index}>
                  <div className="bg-white overflow-hidden rounded-md shadow-md p-2 mb-12">
                    <div className="flex items-center">
                      <img
                        alt=""
                        src="/assets/mock-image.png"
                        className="h-24 w[30%]  object-cover rounded-md"
                      />
                      <p className="text-primary text-size16 font-medium ms-3">
                        التعريف بالعملات الرقمية وفلسفة البيتكوين
                      </p>
                    </div>

                    <div className="flex items-center pt-6">
                      <span className="text-size16 font-medium text-darkGray">
                        11 اكتوبر 2023
                      </span>
                      <div className="flex items-center ms-3">
                        <img
                          alt=""
                          src="/assets/eye.svg"
                          className="mx-2"
                          width={22}
                        />
                        <span className="text-size16 font-medium text-darkGray">
                          440
                        </span>
                      </div>
                    </div>

                    <div className=" pt-6 flex items-center justify-start">
                      <img
                        alt=""
                        src="/assets/mock-image.png"
                        className="h-12 w-12 object-cover rounded-full"
                      />
                      <h6 className="text-size16 font-medium text-yellow mx-4">
                        أ.د / محمد علي
                      </h6>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2">
            <div>
              <iframe
                className="w-full h-[515px]"
                src={visualDetails?.video}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <div className="related-videos mt-16">
        <div className="flex items-center justify-between">
          <h3 className=" text-[28px] text-black font-medium">
            {t("watchMore")}
          </h3>
          <Link href="/visuals" className="btn-yellow !text-size22">
            <span>{t("more")}</span>
          </Link>
        </div>
        {visualDetails?.similers?.length ? (
          <ul className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-8 pt-16">
            {visualDetails?.similers.map((item: any, index: number) => (
              <li key={index}>
                <Link href={`visuals/${1}`}>
                  <Card
                    item={""}
                    img={`/assets/mock-image.png`}
                    title={"التعريف بالعملات الرقمية وفلسفة البيتكوين"}
                  />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <h6 className="text-center mt-16 text-[28px] text-black font-medium">
            {t("notFoundVideos")}
          </h6>
        )}
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

export default VisualDetails;

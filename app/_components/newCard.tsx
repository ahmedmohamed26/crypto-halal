import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
interface CardNewsProps {
  title: string;
  img: string;
}

const CardNews: React.FC<CardNewsProps> = ({ title, img }) => {
  const t = useTranslations("News");
  return (
    <div className="bg-white overflow-hidden rounded-md shadow-md p-6">
      <img
        alt=""
        src="/assets/bg-news.svg"
        className="h-48 w-full object-cover rounded-md"
      />
      <h2 className="title text-primary  text-[14px] md:text-size22 font-medium my-6">
        حصلت Coinbase على موافقة كاملة للعمل في سنغافورة
      </h2>

      <div className="mt-6 flex justify-end">
        <Link
          href={`news/${1}`}
          className="text-primary text-size16 md:text-size22 font-medium"
        >
          {t("readMore")}
        </Link>
      </div>
      <div className="bg-white">
        <span className="flex items-center my-4">
          <span className="h-px flex-1 bg-[#ddd]"></span>
        </span>

        <div className="flex items-center justify-between">
          <span className="text-[12px] md:text-size16 font-medium text-darkGray">
            11 اكتوبر 2023
          </span>
          <div className="flex items-center">
            <img alt="" src="/assets/eye.svg" className="mx-2" />
            <span className="text-[12px] md:text-size16 font-medium text-darkGray">
              440
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardNews;
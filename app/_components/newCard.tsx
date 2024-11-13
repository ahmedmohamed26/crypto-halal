import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import DOMPurify from "isomorphic-dompurify";
interface CardNewsProps {
  item: any;
}

const CardNews: React.FC<CardNewsProps> = ({ item }) => {
  const t = useTranslations("News");
  return (
    <div className="bg-white overflow-hidden rounded-md shadow-md p-6 ">
      {/* <img
        alt=""
        src={item?.image}
        className="h-48 w-full object-cover rounded-md"
      /> */}
      <h2 className="title text-primary  text-[14px] md:text-size22 font-regular">
        {item?.title}
      </h2>

      <p className="title text-black  text-[14px] md:text-size20 font-regular mt-6 text-ellipsis line-clamp-1">
        {DOMPurify.sanitize(item?.desc, {
          USE_PROFILES: { html: false },
        })}
      </p>

      <div className="mt-6 flex justify-end">
        <Link
          href={`news/${item?.id}`}
          className="text-primary text-size16  font-regular"
        >
          {t("readMore")}
        </Link>
      </div>
      <div className="bg-white">
        <span className="flex items-center my-4">
          <span className="h-px flex-1 bg-[#ddd]"></span>
        </span>

        <div className="flex items-center justify-between">
          <span className="text-size14 font-regular text-darkGray">
            {item?.date}
          </span>
          <div className="flex items-center">
            <img alt="" src="/assets/eye.svg" className="mx-2" width={18} />
            <span className="text-[12px] md:text-size16 font-regular text-darkGray">
              {item?.views}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardNews;

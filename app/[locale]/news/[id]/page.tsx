"use client";
import { useUser } from "@/app/_context/UserContext";
import axiosInstance from "@/app/_lib/axios";
import DOMPurify from "isomorphic-dompurify";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const CardNews = dynamic(() => import("@/app/_components/CardNews"));
const ShareIcons = dynamic(() => import("@/app/_components/share-icons"));

function NewsDetails({ params }: { params: { id: string } }) {
  const t = useTranslations("News");
  const [newsDetails, setNewsDetails] = useState<any>({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [text, setText] = useState("");
  const { isLoggedIn } = useUser();
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`news/${params?.id}`);
        const data = response?.data?.data;
        const sanitizedDesc = DOMPurify.sanitize(data?.desc);
        const cleanDesc = sanitizedDesc
          .replace(/&nbsp;/g, " ")
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'");

        setNewsDetails({
          ...data,
          desc: cleanDesc,
        });
      } catch (error) {}
    };

    fetchData();
  }, []);

  const addComment = async () => {
    setLoadingSpinner(true);
    try {
      let data = {
        comment: text,
        news_id: parseInt(params.id),
      };
      const response = await axiosInstance.post(`news`, data);
      setText("");
      toast.success(t("addCommentSuccess"));
      setIsDisabled(true);
      setLoadingSpinner(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message, {
        onClose: () => toast.dismiss(),
      });
      setLoadingSpinner(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    setIsDisabled(!value);
  };

  return (
    <section className="news container">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        rtl={false}
        theme="light"
      />
      <div className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 ">
          <div className="col-span-8 bg-white p-10">
            <img
              src={newsDetails?.image}
              className="w-full h-[400px]"
              alt="News Image"
              loading="lazy"
            />
            <h1 className="mt-8 text-primary text-size22 md:text-[38px] gont-medium">
              {newsDetails?.title}
            </h1>

            <div
              className="text-black text-size22 font-regular mt-10"
              dangerouslySetInnerHTML={{ __html: newsDetails?.desc }}
            />
            <h6 className="text-[#475467] text-size16 font-regular mt-8">
              {newsDetails?.date}
            </h6>
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-3 hidden md:block">
            {newsDetails?.ads?.map((ads: any, index: number) => (
              <Link
                target="_blank"
                href={ads?.link}
                key={index}
                prefetch={false}
              >
                <img
                  src={ads?.image}
                  className="w-full h-[320px] rounded-md mb-16"
                  loading="lazy"
                />
              </Link>
            ))}
          </div>
        </div>

        {newsDetails?.similers?.length ? (
          <div className="related-news mt-16">
            <div className="flex items-center justify-between">
              <h3 className=" text-[28px] text-black font-regular">
                {t("similarArticles")}
              </h3>
              <Link
                href="/news"
                className="btn-yellow !text-size22"
                prefetch={false}
              >
                <span>{t("more")}</span>
              </Link>
            </div>

            <ul className="grid lg:grid-cols-4 grid-cols-2 gap-8 pt-16">
              {newsDetails?.similers?.map((item: any, index: number) => (
                <li key={index}>
                  <CardNews item={item} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="comments lg:flex block items-end justify-between mt-32">
          {isLoggedIn && (
            <div className="bg-[#EAF1FA] p-4 w-full lg:w-[60%] rounded-md max-[600px]:mb-4">
              <div className="flex items-center justify-between">
                <h3 className=" text-[28px] text-black font-regular ">
                  {t("comment")}
                </h3>
                <button
                  className="btn-yellow !text-size22 !px-6 !py-2"
                  disabled={isDisabled}
                  onClick={() => addComment()}
                >
                  {loadingSpinner ? (
                    <div className="border-white h-8 w-8 animate-spin rounded-full border-2 border-t-primary p-2" />
                  ) : (
                    <span>{t("publish")}</span>
                  )}
                </button>
              </div>
              <textarea
                id="message"
                value={text}
                onChange={handleChange}
                rows={7}
                className="mt-4 w-full rounded-md  shadow-sm sm:text-sm  text-black px-1 py-2 indent-2.5 !outline-none resize-none"
              />
            </div>
          )}

          <div className="share">
            <h3 className=" text-size24 text-primary font-regular mb-6">
              {t("share")}
            </h3>
            <ShareIcons pathName={pathname.slice(1)} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsDetails;

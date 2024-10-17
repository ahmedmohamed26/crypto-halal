"use client";
import Card from "@/app/_components/card";
import axiosInstance from "@/app/_lib/axios";
import PdfViewer from "@lmtri/react-pdf-viewer";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Facebook from "../../../../public/assets/facebook.svg";
import instagram from "../../../../public/assets/instagram.svg";
import linkedin from "../../../../public/assets/linkedIn.svg";
import twitter from "../../../../public/assets/x.svg";
import "./style.css";
import { showToaster } from "@/app/_lib/toasters";
import { useUser } from "@/app/_context/UserContext";
import { toast, ToastContainer } from "react-toastify";

function StudyResearchDetails({ params }: { params: { id: string } }) {
  const t = useTranslations("StudyAndResearch");
  const [researchDetails, setResearchDetails] = useState<any>({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [text, setText] = useState("");
  const { isLoggedIn } = useUser();
  const [loadingSpinner, setLoadingSpinner] = useState(false);

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
        const response = await axiosInstance.get(`researches/${params.id}`);
        setResearchDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const addComment = async () => {
    setLoadingSpinner(true);
    try {
      let data = {
        comment: text,
        research_id: parseInt(params.id),
      };
      const response = await axiosInstance.post(`news`, data);
      setText("");
      toast.success(t("addCommentSuccess"));
      setIsDisabled(true);
      setLoadingSpinner(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      setLoadingSpinner(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    setIsDisabled(!value);
  };

  return (
    <section className="py-24 container">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        rtl={false}
        theme="light"
      />
      <h1 className="text-primary text-size22 md:text-[38px] font-medium  mb-4">
        {researchDetails?.title}
      </h1>
      <div className="flex items-center">
        <span className="text-[#475467] text-size16 font-medium">
          {researchDetails?.date}
        </span>
        {/* <div className="flex items-center ms-3">
          <img alt="" src="/assets/clock.svg" className="mx-2" />
          <span className="text-size16 font-medium text-darkGray">
            {researchDetails?.duration}
          </span>
        </div> */}

        <div className="flex items-center ms-3">
          <img alt="" src="/assets/eye.svg" className="mx-2" width={22} />
          <span className="text-size16 font-medium text-darkGray">
            {researchDetails?.views}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-start mt-4">
        <img
          alt=""
          src={researchDetails?.lecturer?.image}
          className="h-12 w-12 object-cover rounded-full"
        />
        <h6 className="text-size22 font-medium text-yellow mx-4">
          {researchDetails?.lecturer?.name}
        </h6>
      </div>

      <div className="video-container mt-16">
        <PdfViewer src={researchDetails?.pdf} fileName="sample.pdf" />
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

        <ul className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-8 pt-16">
          {researchDetails?.similers?.map((item: any, index: number) => (
            <li key={index}>
              <Link href={`study-research/${item?.id}`}>
                <Card item={item} />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="comments lg:flex block items-end justify-between mt-32">
        {isLoggedIn && (
          <div className="bg-[#EAF1FA] p-4 w-full lg:w-[60%] rounded-md max-[600px]:mb-4">
            <div className="flex items-center justify-between">
              <h3 className=" text-[28px] text-black font-medium ">
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
              className="mt-4 w-full rounded-md  shadow-sm sm:text-sm  text-black  indent-2.5 !outline-none resize-none"
            />
          </div>
        )}

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

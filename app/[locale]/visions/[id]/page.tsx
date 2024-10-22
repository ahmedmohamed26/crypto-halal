"use client";
import Card from "@/app/_components/card";
import { useUser } from "@/app/_context/UserContext";
import axiosInstance from "@/app/_lib/axios";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ShareIcons from "@/app/_components/share-icons";

function VisualDetails({ params }: { params: { id: string } }) {
  const [visualDetails, setVisualDetails] = useState<any>({});
  const t = useTranslations("Visions");
  const router = useRouter();
  const pathname = usePathname();
  const [isDisabled, setIsDisabled] = useState(true);
  const [text, setText] = useState("");
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const { isLoggedIn } = useUser();

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

  const addComment = async () => {
    setLoadingSpinner(true);
    try {
      let data = {
        comment: text,
        vision_id: parseInt(params.id),
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
    <>
      <section className="py-24 container">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          closeOnClick
          rtl={false}
          theme="light"
        />
        <h1 className="text-primary text-size22 md:text-[38px] font-regular  mb-4">
          {visualDetails?.title}
        </h1>
        <div className="flex items-center">
          <span className="text-[#475467] text-size16 font-regular">
            {visualDetails?.date}
          </span>
          <div className="flex items-center ms-3">
            <img alt="" src="/assets/clock.svg" className="mx-2" />
            <span className="text-size16 font-regular text-darkGray">
              {visualDetails?.duration}
            </span>
          </div>

          <div className="flex items-center ms-3">
            <img alt="" src="/assets/eye.svg" className="mx-2" width={22} />
            <span className="text-size16 font-regular text-darkGray">
              {visualDetails?.views}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-start mt-4">
          <img
            alt={visualDetails?.lecturer?.name}
            src={visualDetails?.lecturer?.image}
            className="h-12 w-12 object-cover rounded-full"
          />
          <h6 className="text-size22 font-regular text-yellow mx-4">
            {visualDetails?.lecturer?.name}
          </h6>
        </div>

        <div className="video-container mt-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="hidden md:block">
              <ul>
                {visualDetails?.same_lecturers?.map(
                  (item: any, index: number) => (
                    <li key={index}>
                      <button
                        onClick={() => router.push(`/visions/${item?.id}`)}
                        className="w-full"
                      >
                        <div className="bg-white overflow-hidden rounded-md shadow-md p-4 mb-12">
                          <div className="flex items-start">
                            <img
                              alt={item?.title}
                              src={item?.image}
                              className="h-36 w-[50%]  rounded-md"
                            />
                            <div className="ms-4">
                              <h2 className="text-primary text-size18 font-regular  text-start">
                                {item?.title}
                              </h2>
                              <div className="flex justify-between pt-4">
                                <span className="text-size14 lg:text-[12px] font-regular text-darkGray">
                                  {item?.date}
                                </span>
                                <div className="flex items-center">
                                  <img
                                    alt=""
                                    src="/assets/eye.svg"
                                    className="mx-1 w-5 lg:w-3"
                                  />
                                  <span className="text-size14 lg:text-[12px] font-regular text-darkGray">
                                    {item?.views}
                                  </span>
                                </div>
                              </div>
                              <div className=" pt-6 flex items-center justify-start">
                                <img
                                  alt=""
                                  src={item?.lecturer?.image}
                                  className="h-10 w-10 object-cover rounded-full"
                                />
                                <h6 className="text-size14 lg:text-[12px]  font-regular text-yellow mx-4">
                                  {item?.lecturer?.name}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="col-span-2">
              <div>
                <iframe
                  className="w-full h-[515px]"
                  src={visualDetails?.video}
                  title="YouTube video player"
                  allowFullScreen
                ></iframe>
                {/* <iframe
                  className="w-full h-[515px]"
                  src={`https://www.youtube.com/embed/${visualDetails?.video}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe> */}
              </div>
            </div>
          </div>
        </div>

        {visualDetails?.similers?.length ? (
          <div className="related-videos mt-16">
            <div className="flex items-center justify-between">
              <h3 className=" text-[28px] text-black font-regular">
                {t("watchMore")}
              </h3>
              <Link href="/visions" className="btn-yellow !text-size22">
                <span>{t("more")}</span>
              </Link>
            </div>
            <ul className="grid lg:grid-cols-4 grid-cols-2 gap-8 pt-16">
              {visualDetails?.similers.map((item: any, index: number) => (
                <li key={index}>
                  <button
                    className="w-full"
                    onClick={() => router.push(`/visions/${item?.id}`)}
                  >
                    <Card item={item} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <h6 className="text-center mt-16 text-[28px] text-black font-regular">
            {t("notFoundVideos")}
          </h6>
        )}

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
                rows={7}
                value={text}
                onChange={handleChange}
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
      </section>
    </>
  );
}

export default VisualDetails;

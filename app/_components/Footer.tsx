"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import Email from "../../public/assets/email.svg";
import Facebook from "../../public/assets/facebook.svg";
import instagram from "../../public/assets/instagram.svg";
import linkedin from "../../public/assets/linkedIn.svg";
import twitter from "../../public/assets/x.svg";
import youtube from "../../public/assets/youtube.svg";
import axiosInstance from "../_lib/axios";
import { toast, ToastContainer } from "react-toastify";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [dataInfo, setDataInfo] = useState<any>(null);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const t = useTranslations("Footer");
  const subscribeSchema = z.object({
    email: z.string().email(t("validEmailMsg")),
  });

  type FormFields = z.infer<typeof subscribeSchema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormFields>({
    mode: "onSubmit",
    resolver: zodResolver(subscribeSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setLoadingSpinner(true);
    try {
      const response = await axiosInstance.post("email-subscribe", data);
      setLoadingSpinner(false);
      toast.success(t("subscribeSuccessMsg"));
      reset();
    } catch (error: any) {
      setLoadingSpinner(false);
      toast.error(error?.response?.data?.message, {
        onClose: () => toast.dismiss(),
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("info");
        setDataInfo(response.data.data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  const socialMediaList = [
    {
      src: youtube,
      url: dataInfo?.youtube,
    },
    {
      src: linkedin,
      url: dataInfo?.linkedin,
    },
    {
      src: twitter,
      url: dataInfo?.twitter,
    },
    {
      src: instagram,
      url: dataInfo?.instagram,
    },
    {
      src: Facebook,
      url: dataInfo?.facebook,
    },
  ];

  return (
    <footer className="bg-[#06102B] text-white">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        rtl={false}
        theme="light"
      />
      <div className="pt-16">
        <div className="grid grid-cols-1 gap-28 md:grid-cols-4 container !items-start">
          <div>
            <h3 className="text-size20 md:text-[28px] mb-[1.5rem]">
              {t("app-name")}
            </h3>
            <p className="mb-2 text-[14px] font-regular">{t("description1")}</p>
            <p className="text-[14px] font-regular">{t("description2")}</p>
          </div>

          <div>
            <ul className="text-size16 space-y-4">
              <li>
                <Link href="/">{t("home")}</Link>
              </li>

              <li>
                <Link href="/services">{t("services")}</Link>
              </li>
              <li>
                <Link href="/visions">{t("visions")}</Link>
              </li>
              <li>
                <Link href="/news">{t("news")}</Link>
              </li>
              <li>
                <Link href="/study-research">{t("studyAndResearch")}</Link>
              </li>
              <li>
                <Link href="/currencies">{t("currencies")}</Link>
              </li>
            </ul>
          </div>

          <div>
            <ul className="text-size16 space-y-4">
              <li>
                <Link href="/usage">{t("termsOfUse")}</Link>
              </li>

              <li>
                <Link href="/privacy-policy">{t("privacyPolicy")}</Link>
              </li>
              <li>
                <Link href="/terms-conditions">{t("termsAndConditions")}</Link>
              </li>
            </ul>
          </div>

          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h3 className="text-size16  mb-[1.5rem]">
                {t("subscribeToMail")}
              </h3>
              <p className="text-[14px]">{t("subscribeNews")}</p>

              <div className="relative mt-[1.5rem]">
                <input
                  type="email"
                  id="UserEmail"
                  placeholder={t("addEmail")}
                  className="w-full rounded-md  shadow-sm sm:text-sm h-[50px] text-black indent-2.5 !outline-none"
                  {...register("email", {
                    required: true,
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.email.message}
                  </p>
                )}
                <span className="pointer-events-none absolute top-[19px] end-0 grid w-10 place-content-center text-black">
                  <Email width={20} height={20} />
                </span>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  disabled={!isDirty || !isValid}
                  className="inline-block rounded border   bg-[#FFBB00] px-6 py-3  text-primary text-[16px] focus:outline-none focus:ring"
                >
                  {loadingSpinner ? (
                    <div className="border-white h-4 w-4 animate-spin rounded-full border-2 border-t-primary mx-2   p-3" />
                  ) : (
                    t("subscribe")
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-16 py-6 block md:flex md:items-center md:justify-between lg:mt-24 bg-[#101828]">
          <div className="container md:flex justify-between items-center">
            <div className="sm:text-center mb-4 md:mb-0">
              <p className="text-size16">
                {t("copyRight")}
                {currentYear}
              </p>
            </div>
            <ul className="flex justify-center gap-6 sm:mt-0 lg:justify-end">
              {socialMediaList.map((link, index) => {
                const IconComponent = link.src;

                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

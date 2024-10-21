"use client";
import axiosInstance from "@/app/_lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function ContactUs() {
  const t = useTranslations("ContactUs");
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  const contactSchema = z.object({
    name: z.string().nonempty({ message: t("userNameRequiredMsg") }),
    email: z
      .string()
      .nonempty({ message: t("emailRequiredMsg") })
      .email(t("validEmailMsg")),
    subject: z.string().nonempty({ message: t("subjectRequiredMsg") }),
    msg: z.string().nonempty({ message: t("messageRequiredMsg") }),
  });
  type FormFields = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormFields>({
    mode: "onChange",
    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setLoadingSpinner(true);
    try {
      const response = await axiosInstance.post("contact", data);
      setLoadingSpinner(false);
      reset();
      toast.success(t("contactSuccessMsg"));
    } catch (error: any) {
      setLoadingSpinner(false);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <section className="bg-[#F1F7FD] pt-10">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        rtl={false}
        theme="light"
      />{" "}
      <h1 className="text-black text-size22 md:text-[4rem] font-semibold text-center mb-12">
        {t("contactUs")}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="container pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="col-span-2">
            <div className="form-control mb-4">
              <label
                htmlFor="name"
                className="block text-black text-size18 md:text-size22 font-regular mb-4"
              >
                {t("userName")}
              </label>
              <input
                type="text"
                id="name"
                placeholder={t("userName")}
                className="w-full rounded-md  shadow-sm sm:text-sm h-[50px] text-black border indent-2.5 !outline-none"
                {...register("name", {
                  required: true,
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="form-control mb-4">
              <label
                htmlFor="email"
                className="block text-black text-size18 md:text-size22 font-regular mb-4"
              >
                {t("email")}
              </label>
              <input
                type="email"
                id="email"
                placeholder={t("email")}
                className="w-full rounded-md  shadow-sm sm:text-sm h-[50px] text-black border indent-2.5 !outline-none"
                {...register("email", {
                  required: true,
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="form-control mb-4">
              <label
                htmlFor="subject"
                className="block text-black text-size18 md:text-size22 font-regular mb-4"
              >
                {t("subject")}
              </label>
              <input
                type="text"
                id="subject"
                placeholder={t("subject")}
                className="w-full rounded-md  shadow-sm sm:text-sm h-[50px] text-black border indent-2.5 !outline-none"
                {...register("subject", {
                  required: true,
                })}
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.subject.message}
                </p>
              )}
            </div>
          </div>

          <div className="md:flex justify-center hidden">
            <img
              src="assets/contact-us.svg"
              className="h-[300px]"
              alt="contact us"
            />
          </div>
        </div>

        <div className="form-control mb-4">
          <label
            htmlFor="message"
            className="block text-black text-size18 md:text-size22 font-regular mb-4"
          >
            {t("message")}
          </label>
          <textarea
            id="message"
            rows={10}
            placeholder={t("message")}
            className="w-full rounded-md  shadow-sm sm:text-sm  text-black border indent-2.5 px-1 py-2  !outline-none resize-none"
            {...register("msg", {
              required: true,
            })}
          />
          {errors.msg && (
            <p className="text-red-500 text-sm mt-2">{errors.msg.message}</p>
          )}
        </div>

        <div className="flex justify-center mt-12">
          <button
            type="submit"
            disabled={!isDirty || !isValid}
            className="btn-yellow !px-12"
          >
            {loadingSpinner ? (
              <div className="border-white h-10 w-10 animate-spin rounded-full border-2 border-t-primary mx-4   p-3" />
            ) : (
              t("send")
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

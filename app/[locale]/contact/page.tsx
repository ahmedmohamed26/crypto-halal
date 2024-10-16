"use client";
import axiosInstance from "@/app/_lib/axios";
import { showToaster } from "@/app/_lib/toasters";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

export default function ContactUs() {
  const t = useTranslations("ContactUs");
  const [showToast, setShowToast] = useState(false);

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
    try {
      const response = await axiosInstance.post("contact", data);
      setShowToast(true);
      reset();
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error: any) {
      setShowToast(true);
      showToaster(error.message, "red");
    }
  };

  return (
    <section className="bg-[#F1F7FD] pt-10">
      {showToast && showToaster(t("contactSuccessMsg"), "green")}
      <h1 className="text-black text-size22 md:text-[4rem] font-semibold text-center mb-12">
        {t("contactUs")}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="container pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="col-span-2">
            <div className="form-control mb-4">
              <label
                htmlFor="name"
                className="block text-black text-size18 md:text-size22 font-medium mb-4"
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
                className="block text-black text-size18 md:text-size22 font-medium mb-4"
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
                className="block text-black text-size18 md:text-size22 font-medium mb-4"
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

          <div className="text-center hidden md:block">
            <img src="assets/contact-us.svg" alt="contact us" />
          </div>
        </div>

        <div className="form-control mb-4">
          <label
            htmlFor="message"
            className="block text-black text-size18 md:text-size22 font-medium mb-4"
          >
            {t("message")}
          </label>
          <textarea
            id="message"
            rows={10}
            placeholder={t("message")}
            className="w-full rounded-md  shadow-sm sm:text-sm  text-black border indent-2.5 !outline-none resize-none"
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
            {t("send")}
          </button>
        </div>
      </form>
    </section>
  );
}

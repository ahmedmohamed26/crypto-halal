"use client";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  userName: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactUs() {
  const t = useTranslations("ContactUs");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <section className="bg-[#F1F7FD] pt-10">
      <h1 className="text-black text-size22 md:text-[4rem] font-semibold text-center mb-12">
        {t("contactUs")}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="container pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="col-span-2">
            <div className="form-control mb-4">
              <label
                htmlFor="userName"
                className="block text-black text-size18 md:text-size22 font-medium mb-4"
              >
                {t("userName")}
              </label>
              <input
                type="text"
                id="userName"
                placeholder={t("userName")}
                className="w-full rounded-md  shadow-sm sm:text-sm h-[50px] text-black border indent-2.5 !outline-none"
                {...register("userName")}
              />
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
                {...register("email")}
              />
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
                {...register("subject")}
              />
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
            {...register("message")}
          />
        </div>

        <div className="flex justify-center mt-12">
          <button type="submit" className="btn-yellow !px-12">
            {t("send")}
          </button>
        </div>
      </form>
    </section>
  );
}

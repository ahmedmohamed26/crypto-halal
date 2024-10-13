"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import login from "@/app/_lib/login";

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const t = useTranslations("Login");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <section className="bg-[#F1F7FD] pt-10">
      <h1 className="text-black text-size22 md:text-[4rem] font-semibold text-center mb-12">
        {t("login")}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="container pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="form-control  mb-9">
              <label
                htmlFor="UserEmail"
                className="block text-black text-size18 md:text-size22 font-medium mb-4"
              >
                {t("email")}
              </label>
              <input
                type="email"
                id="UserEmail"
                placeholder={t("email")}
                className="w-full rounded-md  shadow-sm sm:text-sm h-[50px] text-black border indent-2.5 !outline-none"
                {...register("email")}
              />
            </div>

            <div className="form-control">
              <label
                htmlFor="UserPassword"
                className="block text-black text-size18 md:text-size22 font-medium mb-4"
              >
                {t("password")}
              </label>
              <input
                type="password"
                id="UserPassword"
                placeholder={t("password")}
                className="w-full rounded-md  shadow-sm sm:text-sm h-[50px] text-black border indent-2.5 !outline-none"
                {...register("password")}
              />
            </div>
            <div className="flex justify-between items-center mt-8">
              <div className="remember-me text-primary text-size16 md:text-size22 font-medium">
                <label
                  htmlFor="Option1"
                  className="flex cursor-pointer items-start gap-2"
                >
                  <div className="flex items-center">
                    &#8203;
                    <input
                      type="checkbox"
                      className="size-4 rounded-full border-gray-300"
                      id="Option1"
                    />
                  </div>

                  <div>
                    <strong className="font-medium text-gray-900">
                      {t("rememberMe")}
                    </strong>
                  </div>
                </label>
              </div>
              <div className="forgot-password text-primary  text-size16 md:text-size22 font-medium">
                <Link href="/forgot-password">{t("forgotPassword")}</Link>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-primary lg:text-[50px] md:text-[35px] sm:text-[20px] font-semibold mb-4">
              {t("title")}
            </h2>
            <div className="grid grid-cols-2 items-center">
              <div className="flex flex-col items-center">
                <Link href="/">
                  <img
                    src="assets/play-store.svg"
                    alt="play store"
                    width={150}
                    height={150}
                    className="mb-8"
                  />
                </Link>

                <Link href="/">
                  <img
                    src="assets/ios-store.svg"
                    alt="ios store"
                    width={150}
                    height={150}
                  />
                </Link>
              </div>
              <img
                src="assets/iPhone.svg"
                alt="store"
                width={250}
                height={250}
              />
            </div>
          </div>
        </div>
        <div className="flex  justify-center mt-16">
          <button type="submit" className="btn-yellow">
            {t("login")}
          </button>
        </div>
      </form>
    </section>
  );
}

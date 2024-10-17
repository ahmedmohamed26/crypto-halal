"use client";
import { useUser } from "@/app/_context/UserContext";
import axiosInstance from "@/app/_lib/axios";
import { showToaster } from "@/app/_lib/toasters";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import * as z from "zod";

export default function Login() {
  const t = useTranslations("Login");
  const router = useRouter();
  const { setUser } = useUser();
  const loginSchema = z.object({
    email: z
      .string()
      .nonempty({ message: t("emailRequiredMsg") })
      .email(t("validEmailMsg")),
    password: z
      .string()
      .nonempty({ message: t("passwordRequiredMsg") })
      .min(6, { message: t("passwordLengthMsg") }),
  });

  type FormFields = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormFields>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await axiosInstance.post("login", data);
      const { token } = response.data.data;
      localStorage.setItem("token", token);
      fetchProfileData();
      setTimeout(() => {
        toast.success(t("loginSuccessMsg"));
      }, 4000);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchProfileData = async () => {
    try {
      const response = await axiosInstance.get("profile");
      const userProfile = response.data.data;
      setUser({
        email: userProfile.email,
        name: userProfile.name,
      });

      router.push("/");
    } catch (error: any) {
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
      />

      <h1 className="text-black text-size22 md:text-[4rem] font-semibold text-center mb-12">
        {t("login")}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="container pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="mb-9 form-control">
              <label
                htmlFor="email"
                className="block text-black text-size18 md:text-size22 font-medium mb-4"
              >
                {t("email")}
              </label>
              <input
                type="text"
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

            <div className="form-control">
              <label
                htmlFor="password"
                className="block text-black text-size18 md:text-size22 font-medium mb-4"
              >
                {t("password")}
              </label>
              <input
                type="password"
                id="password"
                placeholder={t("password")}
                className="w-full rounded-md  shadow-sm sm:text-sm h-[50px] text-black border indent-2.5 !outline-none"
                {...register("password", { required: true })}
              />{" "}
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
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
          <button
            type="submit"
            className="btn-yellow"
            disabled={!isDirty || !isValid}
          >
            {t("login")}
          </button>
        </div>
      </form>
    </section>
  );
}

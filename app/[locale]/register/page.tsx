"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "@/app/_lib/axios";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/_context/UserContext";

function Register() {
  const t = useTranslations("Register");
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const router = useRouter();
  const { setUser } = useUser();

  const registerSchema = z
    .object({
      name: z.string().nonempty({ message: t("userNameRequiredMsg") }),
      email: z
        .string()
        .nonempty({ message: t("emailRequiredMsg") })
        .email(t("validEmailMsg")),
      password: z
        .string()
        .nonempty({ message: t("passwordRequiredMsg") })
        .min(6, { message: t("passwordLengthMsg") }),
      confirmPassword: z
        .string()
        .nonempty({ message: t("passwordRequiredMsg") })
        .min(6, { message: t("passwordLengthMsg") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwordsDoNotMatch"),
      path: ["confirmPassword"],
    });

  type FormFields = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormFields>({
    mode: "onTouched",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (formData) => {
    setLoadingSpinner(true);
    try {
      const data: any = formData;
      delete data.confirmPassword;
      const response = await axiosInstance.post("register", data);
      setLoadingSpinner(false);
      const { token } = response.data.data;
      const userProfile = response.data.data;
      setUser({
        email: userProfile.email,
        name: userProfile.name,
      });
      localStorage.setItem("token", token);
      toast.success(t("registerSuccessMsg"));
      router.push("/subscription");
    } catch (error: any) {
      setLoadingSpinner(false);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <section className="bg-[#F1F7FD]">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        rtl={false}
        theme="light"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="register-form grid grid-cols-1 lg:grid-cols-2 gap-8 container px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div>
            <div className="form-control  mb-9">
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

            <div className="form-control  mb-9">
              <label
                htmlFor="UserEmail"
                className="block text-black text-size18 md:text-size22 font-regular mb-4"
              >
                {t("email")}
              </label>
              <input
                type="email"
                id="UserEmail"
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

            <div className="form-control mb-9">
              <label
                htmlFor="password"
                className="block text-black text-size18 md:text-size22 font-regular mb-4"
              >
                {t("password")}
              </label>
              <input
                type="password"
                id="password"
                placeholder={t("password")}
                className="w-full rounded-md  shadow-sm sm:text-sm h-[50px] text-black border indent-2.5 !outline-none"
                {...register("password", {
                  required: true,
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="form-control mb-9">
              <label
                htmlFor="confirmPassword"
                className="block text-black text-size18 md:text-size22 font-regular mb-4"
              >
                {t("confirmPassword")}
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder={t("confirmPassword")}
                className={
                  errors.confirmPassword
                    ? "border-red-500 w-full rounded-md  shadow-sm sm:text-sm h-[50px] text-black border indent-2.5 !outline-none"
                    : "w-full rounded-md  shadow-sm sm:text-sm h-[50px] text-black border indent-2.5 !outline-none"
                }
                {...register("confirmPassword", {
                  required: true,
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.confirmPassword.message}
                </p>
              )}
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

        <div className="flex justify-center">
          <button
            type="submit"
            className="btn-yellow flex justify-center m-10"
            disabled={!isDirty || !isValid}
          >
            {loadingSpinner ? (
              <div className="border-white h-10 w-10 animate-spin rounded-full border-2 border-t-primary mx-4   p-3" />
            ) : (
              t("register")
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Register;

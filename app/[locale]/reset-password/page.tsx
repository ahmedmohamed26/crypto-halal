"use client";
import axiosInstance from "@/app/_lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import * as z from "zod";

export default function ResetPassword() {
  const t = useTranslations("ResetPassword");
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const router = useRouter();

  const loginSchema = z.object({
    code: z
      .string()
      .nonempty({ message: t("codeRequiredMsg") })
      .min(4, { message: t("codeLengthMsg") })
      .max(4, { message: t("codeLengthMsg") }),
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
    formState: { errors, isDirty, isValid },
  } = useForm<FormFields>({
    // defaultValues: {
    //   code: "4444",
    // },
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setLoadingSpinner(true);
    try {
      const response = await axiosInstance.post("reset-password", data);
      setLoadingSpinner(false);
      toast.success(t("resetPasswordSuccessMsg"));
      router.push("/login");
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
      />

      <h1 className="text-black text-size22 md:text-[4rem] font-semibold text-center mb-12">
        {t("title")}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="container pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="mb-9 form-control">
              <label
                htmlFor="email"
                className="block text-black text-size18 md:text-size22 font-regular mb-4"
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

            <div className="mb-9 form-control">
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
                {...register("password", { required: true })}
              />{" "}
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="form-control">
              <label
                htmlFor="code"
                className="block text-black text-size18 md:text-size22 font-regular mb-4"
              >
                {t("code")}
              </label>
              <input
                type="string"
                id="code"
                placeholder={t("code")}
                className="w-full rounded-md  shadow-sm sm:text-sm h-[50px] text-black border indent-2.5 !outline-none"
                {...register("code", {
                  required: true,
                })}
              />
              {errors.code && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.code.message}
                </p>
              )}
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-primary lg:text-[50px] md:text-[35px] sm:text-[20px] font-semibold mb-4">
              {t("downloadApp")}
            </h2>
            <div className="grid grid-cols-2 items-center">
              <div className="flex flex-col items-center">
                <Link
                  href="https://play.google.com/store/apps/details?id=com.cryptohalal.cryptohalal"
                  target="_blank"
                >
                  <img
                    src="assets/play-store.svg"
                    alt="play store"
                    width={150}
                    height={150}
                    className="mb-8"
                  />
                </Link>

                <Link
                  href="https://apps.apple.com/us/app/crypto-halal/id6450399914"
                  target="_blank"
                >
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
        <div className="flex justify-center mt-16">
          <button
            type="submit"
            className="btn-yellow flex justify-center"
            disabled={!isDirty || !isValid}
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

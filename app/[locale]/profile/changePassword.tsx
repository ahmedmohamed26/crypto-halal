import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";
import { useTranslations } from "next-intl";
import axiosInstance from "@/app/_lib/axios";

export default function ChangePassword() {
  const t = useTranslations("Login");
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  const schema = z
    .object({
      email: z
        .string()
        .nonempty({ message: t("emailRequiredMsg") })
        .email(t("validEmailMsg")),
      oldPassword: z
        .string()
        .nonempty({ message: t("passwordRequiredMsg") })
        .min(6, { message: t("passwordLengthMsg") }),
      newPassword: z
        .string()
        .nonempty({ message: t("passwordRequiredMsg") })
        .min(6, { message: t("passwordLengthMsg") }),
      confirmNewPassword: z
        .string()
        .nonempty({ message: t("passwordRequiredMsg") })
        .min(6, { message: t("passwordLengthMsg") }),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      path: ["confirmNewPassword"],
      message: t("passwordsDoNotMatch"),
    })
    .refine((data) => data.oldPassword !== data.newPassword, {
      path: ["newPassword"],
      message: t("passwordsOldNewDoNotMatch"),
    });

  type ChangePasswordFormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<ChangePasswordFormData>({
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<ChangePasswordFormData> = async (data) => {
    setLoadingSpinner(true);
    try {
      const response = await axiosInstance.post("change-password", data);
      setLoadingSpinner(false);
      toast.success(response?.data?.message);
    } catch (error: any) {
      setLoadingSpinner(false);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          closeOnClick
          rtl={false}
          theme="light"
        />

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
            <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-9 form-control">
          <label
            htmlFor="password"
            className="block text-black text-size18 md:text-size22 font-regular mb-4"
          >
            {t("currentPassword")}
          </label>
          <input
            type="password"
            id="password"
            placeholder={t("currentPassword")}
            className="w-full rounded-md  shadow-sm sm:text-sm h-[50px] text-black border indent-2.5 !outline-none"
            {...register("oldPassword", { required: true })}
          />{" "}
          {errors.oldPassword && (
            <p className="text-red-500 text-sm mt-2">
              {errors.oldPassword.message}
            </p>
          )}
        </div>

        <div className="mb-9 form-control">
          <label
            htmlFor="password"
            className="block text-black text-size18 md:text-size22 font-regular mb-4"
          >
            {t("newPassword")}
          </label>
          <input
            type="password"
            id="newPassword"
            placeholder={t("newPassword")}
            className="w-full rounded-md  shadow-sm sm:text-sm h-[50px] text-black border indent-2.5 !outline-none"
            {...register("newPassword", { required: true })}
          />{" "}
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-2">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <div className="mb-19 form-control">
          <label
            htmlFor="password"
            className="block text-black text-size18 md:text-size22 font-regular mb-4"
          >
            {t("confirmNewPassword")}
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            placeholder={t("confirmNewPassword")}
            className="w-full rounded-md  shadow-sm sm:text-sm h-[50px] text-black border indent-2.5 !outline-none"
            {...register("confirmNewPassword", { required: true })}
          />{" "}
          {errors.confirmNewPassword && (
            <p className="text-red-500 text-sm mt-2">
              {errors.confirmNewPassword.message}
            </p>
          )}
        </div>

        <div className="flex justify-center !mt-12">
          <button
            type="submit"
            className="btn-yellow flex justify-center"
            disabled={!isDirty || !isValid}
          >
            {loadingSpinner ? (
              <div className="border-white h-10 w-10 animate-spin rounded-full border-2 border-t-primary mx-4 p-3" />
            ) : (
              t("save")
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

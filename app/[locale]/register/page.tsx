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
  const [paymentMethod, setPaymentMethod] = useState("digital-currency");
  const t = useTranslations("Register");
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const router = useRouter();
  const { setUser } = useUser();

  const registerSchema = z
    .object({
      name: z.string().nonempty({ message: t("userNameRequiredMsg") }),
      plan_id: z.number(),
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
    defaultValues: {
      plan_id: 1,
    },
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
      router.push("/");
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
      <form onSubmit={handleSubmit(onSubmit)} className="py-20">
        <div className="bg-white  px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <h2 className="text-center font-semibold text-black text-[50px] mb-8">
            اختر خطتك
          </h2>
          <div className="container grid grid-cols-1 gap-4  sm:items-stretch md:grid-cols-3 md:gap-16 text-center">
            <div className="card px-8 py-12 bg-[#EAEAEA] rounded-md shadow-md">
              <h2 className="text-black font-semibold text-[28px] mb-8">
                اشتراك عادي
                <span className="sr-only">Plan</span>
              </h2>

              <p className="text-primary font-bold text-[38px] mb-8">$ 15.00</p>
              <p className="text-black font-medium text-size22 mb-8">
                هذا الاشتراك يمكنك من معرفة مشاريع العملات وحكمها والتحديثات
                لمدة 60 يوم
              </p>
              <button className="btn-yellow"> اشترك الان</button>
            </div>

            <div className="card px-8 py-12 bg-[#EAEAEA] rounded-md shadow-md">
              <h2 className="text-black font-semibold text-[28px] mb-8">
                الخطة نصف السنوية <span className="sr-only">Plan</span>
              </h2>

              <p className="text-primary font-bold text-[38px] mb-8">$ 31.00</p>
              <p className="text-black font-medium text-size22 mb-8">
                هذا الاشتراك يمكنك من معرفة مشاريع العملات وحكمها والتحديثات
                لمدة 180 يوم
              </p>
              <button className="btn-yellow"> اشترك الان</button>
            </div>

            <div className="card px-8 py-12 bg-[#EAEAEA] rounded-md shadow-md">
              <h2 className="text-black font-semibold text-[28px] mb-8">
                الخطة السنوية<span className="sr-only">Plan</span>
              </h2>

              <p className="text-primary font-bold text-[38px] mb-8">$ 55.00</p>
              <p className="text-black font-medium text-size22 mb-8">
                هذا الاشتراك يمكنك من معرفة مشاريع العملات وحكمها والتحديثات
                لمدة 365 يوم
              </p>
              <button className="btn-yellow"> اشترك الان</button>
            </div>
          </div>
        </div>

        <div className="register-form grid grid-cols-1 lg:grid-cols-2 gap-8 container px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div>
            <div className="form-control  mb-9">
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
                className="block text-black text-size18 md:text-size22 font-medium mb-4"
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
                className="block text-black text-size18 md:text-size22 font-medium mb-4"
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

        <div className=" bg-white  py-8">
          <div className="container grid grid-cols-1 lg:grid-cols-2">
            <div>
              {/* Payment Method Section */}
              <div>
                <h2 className="text-size16 md:text-[28px] font-medium mb-4">
                  اختر وسيلة للدفع مناسبة
                </h2>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="digital-currency"
                    name="payment-method"
                    value="digital-currency"
                    checked={paymentMethod === "digital-currency"}
                    onChange={() => setPaymentMethod("digital-currency")}
                    className="hidden"
                  />
                  <label
                    htmlFor="digital-currency"
                    className="flex items-center cursor-pointer bg-[#F1F7FD] px-2 py-4 rounded-lg w-full"
                  >
                    <div className="w-5 h-5 border border-blue-500 rounded-full flex justify-center items-center mx-2 peer-checked:bg-blue-500 peer-checked:border-transparent">
                      {paymentMethod === "digital-currency" && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    العملات الرقمية
                  </label>
                </div>
              </div>

              {/* Coupon Code Section */}
              <div className="mt-6 ">
                <h2 className="text-size16 md:text-[28px] font-medium mb-4">
                  أدخل رمز القسيمة
                </h2>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="أدخل رمز القسيمة"
                    className="w-full p-3   rounded-md bg-[#F1F7FD] focus:outline-none"
                  />
                  <button className="btn-yellow mx-2  !text-size18 md:!text-size22">
                    تفعيل
                  </button>
                </div>
              </div>

              {/* Invoice Summary Section */}
              <div className="mt-8">
                <h2 className="text-size16 md:text-[28px] font-medium mb-9">
                  ملخص الفاتورة
                </h2>
                <div className="text-gray-600 text-[14px] md:text-size16">
                  <p className="mb-9">
                    الباقة المختارة:{" "}
                    <span className="font-semibold">النسخة النصف سنوية</span>،
                    سعر الباقة: <span className="font-semibold">USD 30.00</span>
                  </p>
                  <p>
                    كوبون تخفيض: <span className="font-semibold">USD 0.00</span>{" "}
                    المبلغ الإجمالي:{" "}
                    <span className="font-semibold">USD 30.00</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 flex justify-center">
          <button
            type="submit"
            className="btn-yellow flex justify-center"
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

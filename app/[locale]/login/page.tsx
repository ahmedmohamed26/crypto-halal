"use client";
import ForgetPassword from "@/app/_components/forget-password";
import { useUser } from "@/app/_context/UserContext";
import axiosInstance from "@/app/_lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, useDisclosure } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import * as z from "zod";

export default function Login() {
  const t = useTranslations("Login");
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const router = useRouter();
  const { setUser } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const loginSchema = z.object({
    username: z.string().nonempty({ message: t("userNameRequiredMsg") }),
    password: z
      .string()
      .nonempty({ message: t("passwordRequiredMsg") })
      .min(6, { message: t("passwordLengthMsg") }),
  });

  type FormFields = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormFields>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setLoadingSpinner(true);
    try {
      const response = await axiosInstance.post("login", data);
      setLoadingSpinner(false);
      const { token } = response.data.data;
      localStorage.setItem("token", token);
      fetchProfileData();
      toast.success(t("loginSuccessMsg"));
    } catch (error: any) {
      setLoadingSpinner(false);
      toast.error(error?.response?.data?.message, {
        onClose: () => toast.dismiss(),
      });
    }
  };

  const fetchProfileData = async () => {
    try {
      const response = await axiosInstance.get("profile");
      const userProfile = response.data.data;
      setUser({
        email: userProfile.email,
        name: userProfile.name,
        subscribe_flag: userProfile.subscribe_flag,
      });

      router.push("/");
    } catch (error: any) {
      toast.error(error?.response?.data?.message, {
        onClose: () => toast.dismiss(),
      });
    }
  };

  return (
    <section className="bg-[#F1F7FD] pt-10">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        rtl={true}
        theme="light"
        limit={1}
        containerId="one"
      />

      <h1 className="text-black text-size22 md:text-[4rem] font-regular text-center mb-12">
        {t("login")}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="container pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="mb-9 form-control">
              <label
                htmlFor="userName"
                className="block text-black text-size18 md:text-size22 font-regular mb-4"
              >
                {t("userName")}
              </label>
              <input
                type="text"
                id="userName"
                placeholder={t("userName")}
                className="w-full rounded-md  shadow-sm sm:text-sm h-[50px] text-black border indent-2.5 !outline-none"
                {...register("username", {
                  required: true,
                })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="form-control">
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
            <div className="flex justify-between items-center mt-8">
              <div className="remember-me text-primary text-size16 md:text-size22">
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
                    <h3 className="font-regular text-black">
                      {t("rememberMe")}
                    </h3>
                  </div>
                </label>
              </div>
              <Button
                className="bg-transparent forgot-password text-primary  text-size16 md:text-size22 font-regular"
                onPress={onOpen}
              >
                {t("forgotPassword")}
              </Button>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-primary lg:text-[50px] md:text-[35px] sm:text-[20px] font-semibold mb-4">
              {t("title")}
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
                    loading="lazy"
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
                    loading="lazy"
                  />
                </Link>
              </div>
              <img
                src="assets/iPhone.svg"
                alt="store"
                width={250}
                height={250}
                loading="lazy"
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
              t("login")
            )}
          </button>
        </div>
      </form>
      <ForgetPassword isOpen={isOpen} onClose={onClose} />
    </section>
  );
}

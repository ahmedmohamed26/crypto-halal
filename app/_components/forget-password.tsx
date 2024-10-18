"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import axiosInstance from "../_lib/axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

function ForgetPassword({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("Login");
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const router = useRouter();

  const forgetPasswordSchema = z.object({
    email: z
      .string()
      .nonempty({ message: t("emailRequiredMsg") })
      .email(t("validEmailMsg")),
  });

  type FormFields = z.infer<typeof forgetPasswordSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormFields>({
    mode: "onTouched",
    resolver: zodResolver(forgetPasswordSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setLoadingSpinner(true);
    try {
      const response = await axiosInstance.post("forget-password", data);
      setLoadingSpinner(false);
      toast.success(t("forgetPasswordSuccessMsg"));
      router.push("/reset-password");
    } catch (error: any) {
      setLoadingSpinner(false);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        closeOnClick
        rtl={false}
        theme="light"
      />
      <Modal isOpen={isOpen} size={"lg"} onOpenChange={onClose}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {t("forgotPasswordTitle")}
              </ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <img
                    className="w-full h-[160px]"
                    src="/assets/forget-password.svg"
                    alt="forget-password"
                  />
                  <p className="mt-8 text-size22 text-black font-medium">
                    {t("insertEmail")}
                  </p>
                  <div className="flex my-4">
                    <div className="w-[80%]">
                      <input
                        type="text"
                        placeholder={t("email")}
                        className="w-full p-3  h-[50px] rounded-md bg-[#F1F7FD] focus:outline-none"
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
                    <button
                      className="btn-yellow mx-2 !h-[50px] !text-size18 md:!text-size22"
                      disabled={!isDirty || !isValid}
                    >
                      {loadingSpinner ? (
                        <div className="border-white h-6 w-6 animate-spin rounded-full border-2 border-t-primary mx-4   p-3" />
                      ) : (
                        t("makeSure")
                      )}
                    </button>
                  </div>
                </ModalBody>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ForgetPassword;

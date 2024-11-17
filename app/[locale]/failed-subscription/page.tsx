"use client";
import axiosInstance from "@/app/_lib/axios";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function FailedSubscription() {
  const t = useTranslations("Subscription");
  const router = useRouter();
  const searchParams = useSearchParams();
  const NPIdQuery = searchParams.get("NP_id");

  useEffect(() => {
    updatePayment();
  }, [NPIdQuery]);

  const updatePayment = async () => {
    try {
      const data: any = {
        payment_id: NPIdQuery,
      };
      const response = await axiosInstance.post("update-payment", data);
      router.push("/subscription");
    } catch (error: any) {
      router.push("/subscription");
    }
  };

  return (
    <div className="bg-white h-[70vh] flex items-center">
      <div className=" md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-red-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.95 15.536a1 1 0 1 1-1.414 1.414L12 13.414l-3.536 3.536a1 1 0 0 1-1.414-1.414L10.586 12 7.05 8.464a1 1 0 0 1 1.414-1.414L12 10.586l3.536-3.536a1 1 0 0 1 1.414 1.414L13.414 12l3.536 3.536z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            {t("subscriptionfailed.title")}
          </h3>
          <p className="text-gray-600 my-2">
            {t("subscriptionfailed.description1")}
          </p>
          <div className="py-10 text-center">
            <Link
              href="/subscription"
              className="btn-yellow  !text-size16"
              prefetch
            >
              {t("subscriptionfailed.goSubscription")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FailedSubscription;

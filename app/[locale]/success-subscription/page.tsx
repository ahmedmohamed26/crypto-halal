"use client";
import { useUser } from "@/app/_context/UserContext";
import axiosInstance from "@/app/_lib/axios";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function SuccessSubscription() {
  const t = useTranslations("Subscription");
  const searchParams = useSearchParams();
  const NPIdQuery = searchParams.get("NP_id");
  const router = useRouter();
  const { setUser } = useUser();

  useEffect(() => {
    updatePayment();
  }, [NPIdQuery]);

  const updatePayment = async () => {
    try {
      const data: any = {
        payment_id: NPIdQuery,
      };
      const response = await axiosInstance.post("update-payment", data);
      fetchProfileData();
    } catch (error: any) {
      router.push("/");
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
      router.push("/currencies");
    } catch (error: any) {
      router.push("/");
    }
  };

  return (
    <div className="bg-white h-[70vh] flex items-center">
      <div className=" md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            {t("subscriptionSuccess.title")}
          </h3>
          <p className="text-gray-600 my-2">
            {t("subscriptionSuccess.description1")}
          </p>
          <p> {t("subscriptionSuccess.description2")} </p>
          <div className="py-10 text-center">
            <Link
              href="/"
              className="btn-yellow  !text-size16"
              prefetch={false}
            >
              {t("subscriptionSuccess.goHome")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessSubscription;

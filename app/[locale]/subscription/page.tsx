"use client";
import axiosInstance from "@/app/_lib/axios";
import React, { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import { useTranslations } from "next-intl";
import { toast, ToastContainer } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

function Subscription() {
  const t = useTranslations("Register");
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("digital-currency");
  const [data, setData] = useState([]);
  const [planId, setPlanId] = useState<number>();
  const [loadingSpinner, setLoadingSpinner] = useState(true);
  const searchParams = useSearchParams();
  // const search = searchParams.get('search')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("plans");
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    console.log(searchParams);
  }, [searchParams]);

  const subscribeFn = async (planId: number) => {
    setPlanId(planId);
    setLoadingSpinner(true);
    try {
      let data = {
        plan_id: planId,
      };
      const response = await axiosInstance.post(`subscriptions`, data);
      setLoadingSpinner(false);
      router.push(response.data.data.invoice_url);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      setLoadingSpinner(false);
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        rtl={false}
        theme="light"
      />
      <div className="bg-white px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <h2 className="text-center font-semibold text-black text-[50px] mb-8">
          {t("chooseYourPlan")}
        </h2>
        <div className="container grid grid-cols-1 gap-4  sm:items-stretch md:grid-cols-3 md:gap-16 text-center">
          {data.map((plan: any) => (
            <div
              className="card px-8 py-12 bg-[#EAEAEA] rounded-md shadow-md"
              key={plan.id}
            >
              <h2 className="text-black font-semibold text-[28px] mb-8">
                {plan?.name}
                <span className="sr-only">Plan</span>
              </h2>

              <p className="text-primary font-bold text-[38px] mb-8">
                $ {plan?.price}.00
              </p>
              <p className="text-black font-regular text-size22 mb-8">
                {DOMPurify.sanitize(plan?.desc, {
                  USE_PROFILES: { html: false },
                })}
              </p>
              <button
                className="btn-yellow"
                onClick={() => subscribeFn(plan.id)}
              >
                {loadingSpinner && planId == plan.id ? (
                  <div className="border-white h-8 w-8 animate-spin rounded-full border-2 border-t-primary p-2" />
                ) : (
                  <span>{t("subscribeNow")}</span>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className=" bg-white  py-8">
        <div className="container grid grid-cols-1 lg:grid-cols-2">
          <div>
            {/* Payment Method Section */}
            <div>
              <h2 className="text-size16 md:text-[28px] font-regular mb-4">
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
              <h2 className="text-size16 md:text-[28px] font-regular mb-4">
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
              <h2 className="text-size16 md:text-[28px] font-regular mb-9">
                ملخص الفاتورة
              </h2>
              <div className="text-gray-600 text-[14px] md:text-size16">
                <p className="mb-9">
                  الباقة المختارة:{" "}
                  <span className="font-semibold">النسخة النصف سنوية</span>، سعر
                  الباقة: <span className="font-semibold">USD 30.00</span>
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
    </div>
  );
}

export default Subscription;

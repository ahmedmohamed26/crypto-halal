import axiosInstance from "@/app/_lib/axios";
import { useTranslations } from "next-intl";
import React from "react";
import { useEffect, useState } from "react";

function Subscription() {
  const t = useTranslations("Profile");
  const [profileData, setProfileData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("profile");
        setProfileData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="">
      <h1 className="text-black text-[30px] font-regular">
        {t("subscription")}
      </h1>
      <div className="md:flex block items-center justify-between mt-12">
        <h4 className="text-black text-size22 font-semibold">
          {t("currentSubscription")}
        </h4>
        <h4 className="text-primary text-size20 font-regular">
          {profileData?.subscription?.plan?.name}
        </h4>
      </div>
      <p className="text-[#444444] text-size18 font-regular mt-8">
        {t("planDetails")} {""}
        <strong>{profileData?.subscription?.plan?.duration}</strong> {t("day")}
      </p>

      <div className="md:flex block items-center justify-between mt-12">
        <h4 className="text-black text-size22 font-semibold">
          {t("subscriptionValue")}
        </h4>
        <h4 className="text-primary text-size20 font-regular">
          USD {profileData?.subscription?.plan?.price}
        </h4>
      </div>

      <div className="flex items-center justify-center mt-12">
        {!profileData?.subscribe_flag && (
          <button className="btn-yellow !text-size18">
            {t("renewSubscription")}
          </button>
        )}
      </div>
    </section>
  );
}

export default Subscription;

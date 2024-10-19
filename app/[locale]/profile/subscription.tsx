import { useTranslations } from "next-intl";
import React from "react";

function Subscription() {
  const t = useTranslations("Profile");
  return (
    <section className="">
      <h1 className="text-black text-[30px] font-medium">
        {t("subscription")}
      </h1>
      <div className="flex items-center justify-between mt-12">
        <h4 className="text-black text-size22 font-semibold">
          {t("currentSubscription")}
        </h4>
        <h4 className="text-primary text-size20 font-medium">
          الخطة النصف سنوية
        </h4>
      </div>
      <p className="text-[#444444] text-size18 font-medium mt-8">
        {t("planDetails")}
        180 {t("day")}
      </p>

      <div className="flex items-center justify-between mt-12">
        <h4 className="text-black text-size22 font-semibold">
          {t("subscriptionValue")}
        </h4>
        <h4 className="text-primary text-size20 font-medium">USD 30</h4>
      </div>

      <div className="flex items-center justify-center mt-12">
        <button className="btn-yellow !text-size18">
          {t("renewSubscription")}
        </button>
      </div>
    </section>
  );
}

export default Subscription;

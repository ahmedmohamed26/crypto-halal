import { useTranslations } from "next-intl";
import React from "react";

export default function CurrencyDetails() {
  const t = useTranslations("Currencies");
  return (
    <section className="bg-[#0b2962] py-28">
      <div className="container">
        <h1 className="text-center text-white text-[50px] font-semibold">
          {t("currencyCard")}
        </h1>

        <div>
          <div className="bg-[#1E3760] mt-7 rounded-md p-4">
            <h2 className="text-[22px] font-medium text-white">
              {t("projectType")} : <span>تقني </span>
            </h2>
          </div>
          <p className="text-size18 font-medium text-white w-full md:w-[50%] mt-8 leading-10">
            يعتبر المشروع منصة تطوير لامركزية مبنية بشكل أساسي على بلوكتشين عام
            ومشترك، حيث يقوم هذا البروتوكول بتوفير بيئة صديقة للمطورين. وهو يركز
            بشكل أساسي على تسهيل تطوير التطبيقات اللامركزية DApps للمطورين،
            وأيضًا الحفاظ عليها حتى عند توسيع نطاقها وذلك ليشمل ملايين
            المستخدمين،  يقوم مشروع Near بتوفير حزمة OSS Stack تقوم بالسماح
            للمطورين بكتابة عقود ذكية على البلوكشين وذلك عن طريق استخدامه بأي
            لغة ويتم تجميعها إلى WebAssembly وهذا سيكون دعم لكل
            من AssemblyScript وRust. يقوم مشروع NEAR بالسماح ببناء تطبيقات
            لامركزية وتهيئة المستخدمين من أجل إنجاز تطبيقات واسعة النطاق، يقوم
            بروتوكول NEAR باستخدام آلية إجماع جديدة والتي يطلق عليها اسم TPoS،
            وهذا من أجل ضمان التحقق من صحة المعاملات بالشكل الصحيح.
          </p>
        </div>

        <div>
          <div className="bg-[#1E3760] mt-7 rounded-md p-4">
            <h2 className="text-[22px] font-medium text-white">
              {t("projectServices")}
            </h2>
          </div>
          <p className="text-size18 font-medium text-white w-full md:w-[50%] mt-8 leading-10">
            محفظة NEAR التي تتيح لمطوري التطبيقات إنشاء واجهات مستخدم محسّنة.
            خدمة” NEAR Explorer” للمساعدة على تصحيح أخطاء العقود وفهم أداء
            الشبكة.خدمة أوامر NEAR لتمكين المطورين من نشر التطبيقات من السيرفرات
            المحلية
          </p>
        </div>

        <div className="bg-[#059669] mt-9 rounded-md p-4 w-auto inline-block">
          <h2 className="text-[22px] font-medium text-white">
            {t("projectRule")} : <span>مباح</span>
          </h2>
        </div>
      </div>
    </section>
  );
}

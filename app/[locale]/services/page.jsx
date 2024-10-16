"use client";
import axiosInstance from "@/app/_lib/axios";
import { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";

export default function Services() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("services");
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="services bg-gray">
      {data?.map((service, index) =>
        (index + 1) % 2 === 0 ? (
          <div key={index} id={index} className="pt-16">
            <h3 className="text-center mb-16 text-[38px] text=black font-medium">
              {service?.name}
            </h3>
            <div
              style={{
                background:
                  "linear-gradient(-90deg, rgba(0,69,119,1) 0%, rgba(0,128,221,1) 65%)",
              }}
              className="py-16"
            >
              <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                  <p className="text-white font-medium text-[28px]  order-2 md:order-1">
                    {DOMPurify.sanitize(service?.desc, {
                      USE_PROFILES: { html: false },
                    })}
                  </p>
                  <div className="flex items-center lg:justify-end justify-center order-1 md:order-2  mb-8 md:mb-0">
                    <img src={service?.image} alt={service?.name} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div id="halal-cryptoApp" className="pt-16">
            <h3 className="text-center mb-16 text-[38px] text=black font-medium">
              {service?.name}
            </h3>
            <div className="bg-white py-16">
              <div className="container ">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                  <div className="flex items-center lg:justify-start justify-center  mb-8 md:mb-0">
                    <img src={service?.image} alt={service?.name} />
                  </div>
                  <p className="text-black font-medium text-[28px]">
                    {DOMPurify.sanitize(service?.desc, {
                      USE_PROFILES: { html: false },
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      )}
      {/* <div id="legitimacy-check" className="pt-16">
        <h3 className="text-center mb-16 text-[38px] text=black font-medium">
          فحص المشروعية 
        </h3>
        <div
          style={{
            background:
              "linear-gradient(-90deg, rgba(0,69,119,1) 0%, rgba(0,128,221,1) 65%)",
          }}
          className="py-16"
        >
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
              <p className="text-white font-medium text-[28px]  order-2 md:order-1">
                وهي خدمة يقدمها المكتب من خلال فريق متخصص في الجوانب الشرعية
                والتقنية والترجمة, وتسلم تقاريرها التفصيلية للعملاء ابتداء من
                وصف المشروع ومرورا بخدماته واستخدامات العملة, وانتهاء بالحكم
                الشرعي الخاص بكل مشروع, كل ذلك باللغتين العربية والانجليزية.
              </p>
              <div className="flex items-center lg:justify-end justify-center order-1 md:order-2  mb-8 md:mb-0">
                <img src="assets/services/trading-online.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="halal-cryptoApp" className="pt-16">
        <h3 className="text-center mb-16 text-[38px] text=black font-medium">
          {" "}
          تطبيق كريبتوا حلال
        </h3>
        <div className="bg-white py-16">
          <div className="container ">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
              <div className="flex items-center lg:justify-start justify-center  mb-8 md:mb-0">
                <img src="assets/iPhone.svg" alt="" />
              </div>
              <p className="text-black font-medium text-[28px]">
                هو تطبيق للهواتف يقدم خدمة فحص مشروعية العملات لعدد (1500) عملة
                ,ويقوم المكتب بالعمل على إضافة (1000) عملة أخرى كل ثلاثة أشهر,
                بحسب ترتيب الكوين ماركت كاب, مع إجراء متابعة مستمرة لمعرفة
                التحديثات وإضافتها, وهو الأمر الذي قد يضع حلا نهائيا لمشكلة
                معرفة مشروعية العملات من قبل المتداولين
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="sharia-supervision" className="pt-16">
        <h3 className="text-center mb-16 text-[38px] text=black font-medium">
          {" "}
          الرقابة الشرعية
        </h3>
        <div
          style={{
            background:
              "linear-gradient(-90deg, rgba(0,69,119,1) 0%, rgba(0,128,221,1) 65%)",
          }}
          className="py-16"
        >
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <p className="text-white font-medium text-[28px] order-2 md:order-1">
                يقدم مكتب كريبتو حلال خدمات الرقابة الشرعية على مشاريع العملات
                الرقمية منذ مرحلة كتابة الورقة البيضاء, مرورا بمرحلة انشاء العقد
                الذكي, وانتهاء بمرحلة الطرح في أسواق التداول, للتأكد من عدم وجود
                أي مخالفة شرعية في المراحل المذكورة, وإصدار شهادة من المكتب
                بتحقق المعايير الشرعية في المشروع محل الفحص.
              </p>
              <div className="flex items-center lg:justify-end justify-center order-1 md:order-2 mb-8 md:mb-0">
                <img src="assets/services/sharia-supervision.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="forensic-audit" className="pt-16">
        <h3 className="text-center mb-16 text-[38px] text=black font-medium">
          التدقيق الشرعي
        </h3>
        <div className="bg-white py-16">
          <div className="container ">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
              <div className="flex items-center lg:justify-start justify-center  mb-8 md:mb-0">
                <img src="assets/services/forensic-audit.svg" alt="" />
              </div>
              <p className="text-black font-medium text-[28px]">
                تتمثل في متابعة أعمال المشاريع وفحص سلامة التنفيذ ومدى الالتزام
                بالمتطلبات الشرعية, ترفع جهات التدقيق تقاريرها إلى جهة الرقابة
                الشرعية للتواصل مع إدارة المشروع وتصويب الخطأ حال وجوده, وفي حال
                عدم التصويب تقوم جهة التدقيق في التقرير النهائي الذي ترفعه إلى
                الجمعية العامة في حال صناديق الاستثمار ومشاريع العملات الرقمية,
                مع بيان مقدار الربح المتحقق من الأعمال غير المشروعة للتخلص منه
                في جهات الإنفاق الخيرية.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="sharia-standards" className="pt-16">
        <h3 className="text-center mb-16 text-[38px] text=black font-medium">
          المعايير الشرعية
        </h3>
        <div
          style={{
            background:
              "linear-gradient(-90deg, rgba(0,69,119,1) 0%, rgba(0,128,221,1) 65%)",
          }}
          className="py-16"
        >
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
              <p className="text-white font-medium text-[28px] order-2 md:order-1">
                شرع المكتب بالفعل بكتابة مسودة للمعايير الشرعية لتعاملات اسواق
                العملات الرقمية , وكل ذلك بمشاركة تقنيين وشرعيين ومتداولين
                مخضرمين, وجاري العمل على باقي المعايير بهدف تقديمها في المستقبل
                القريب إلى فريق من علماء الشريعة من مختلف انحاء العالم الإسلامي,
                لتكون نقطة انطلاق لاعتمادها أو إضافة ما يستجد عليها .
              </p>
              <div className="flex items-center lg:justify-end justify-center order-1 md:order-2  mb-8 md:mb-0">
                <img src="assets/services/sharia-standards.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="media" className="pt-16">
        <h3 className="text-center mb-16 text-[38px] text=black font-medium">
          الإعلام ومواقع التواصل الاجتماعي
        </h3>
        <div className="bg-white py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
              <div className="flex items-center lg:justify-start justify-center  mb-8 md:mb-0">
                <img src="assets/services/media.svg" alt="" />
              </div>
              <p className="text-black font-medium text-[28px]">
                انطلقت خدمات مكتب كريبتو حلال الإعلامية من خلال قناة كريبتو حلال
                على التليغرام, والتي بلغ عدد المشتركين فيها أكثر من 110 الاف
                مشترك , وكذلك الحال في قناة أكاديمية كريبتو حلال التي التي تضم
                قرابة 35 الف مشترك, وصفحات كريبتو حلال على مواقع التواصل
                الاجتماعي مع التنويه أن جميع موادنا الإعلامية هي باللغتين
                العربيةو الإنجليزية.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="technical-analysis" className="pt-16">
        <h3 className="text-center mb-16 text-[38px] text=black font-medium">
          خدمه التحليل الفني{" "}
        </h3>
        <div
          style={{
            background:
              "linear-gradient(-90deg, rgba(0,69,119,1) 0%, rgba(0,128,221,1) 65%)",
          }}
          className="py-16"
        >
          <div className="container ">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
              <p className="text-white font-medium text-[28px] order-2 md:order-1">
                وهي خدمة يقدمها المكتب من خلال فريق متخصص في الجوانب الشرعية
                والتقنية والترجمة, وتسلم تقاريرها التفصيلية للعملاء ابتداء من
                وصف المشروع ومرورا بخدماته واستخدامات العملة, وانتهاء بالحكم
                الشرعي الخاص بكل مشروع, كل ذلك باللغتين العربية والانجليزية.
              </p>
              <div className="flex items-center lg:justify-end justify-center order-1 md:order-2 mb-8 md:mb-0">
                <img src="assets/services/technical-analysis.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
}

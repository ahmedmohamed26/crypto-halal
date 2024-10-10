export default function Services() {
  return (
    <section className="services bg-gray py-16">
      <div id="legitimacy-check">
        <h3 className="text-center mb-16 text-[38px] text=black font-medium">
          {" "}
          فحص المشروعية 
        </h3>
        <div
          style={{
            background:
              "linear-gradient(-90deg, rgba(0,69,119,1) 0%, rgba(0,128,221,1) 65%)",
          }}
          className="py-16"
        >
          <div className="container ">
            <div className="grid grid-cols-2 items-center">
              <p className="text-white font-medium text-[28px]">
                وهي خدمة يقدمها المكتب من خلال فريق متخصص في الجوانب الشرعية
                والتقنية والترجمة, وتسلم تقاريرها التفصيلية للعملاء ابتداء من
                وصف المشروع ومرورا بخدماته واستخدامات العملة, وانتهاء بالحكم
                الشرعي الخاص بكل مشروع, كل ذلك باللغتين العربية والانجليزية.
              </p>
              <div className="flex items-center justify-center">
                <img src="assets/trading-online.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="halal-cryptoApp" className="py-16">
        <h3 className="text-center mb-16 text-[38px] text=black font-medium">
          {" "}
          تطبيق كريبتوا حلال
        </h3>
        <div className="bg-white py-16">
          <div className="container ">
            <div className="grid grid-cols-2 items-center">
              <div className="flex items-center justify-center">
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
    </section>
  );
}

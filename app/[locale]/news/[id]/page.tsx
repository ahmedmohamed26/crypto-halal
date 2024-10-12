import CardNews from "@/app/_components/newCard";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Facebook from "../../../../public/assets/facebook.svg";
import instagram from "../../../../public/assets/instagram.svg";
import linkedin from "../../../../public/assets/linkedIn.svg";
import twitter from "../../../../public/assets/x.svg";
import "./style.css";

function NewsDetails({ params }: { params: { id: string } }) {
  const newsListLength = Array.from({ length: 3 });
  const t = useTranslations("News");
  const socialMediaList = [
    {
      src: instagram,
      url: "/",
    },
    {
      src: twitter,
      url: "/",
    },
    {
      src: Facebook,
      url: "/",
    },
    {
      src: linkedin,
      url: "/",
    },
  ];
  return (
    <section className="news container">
      <div className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 ">
          <div className="col-span-8">
            <img src="/assets/bg-news.svg" />
            <h1 className="mt-8 text-primary text-size22 md:text-[38px] gont-medium">
              رفعت هيئة الأوراق المالية والبورصة دعوى قضائية ضد مدقق حسابات FTX
            </h1>
            <h6 className="text-[#475467] text-size16 font-medium mt-8">
              11 اكتوبر 2023
            </h6>
            <p className="text-black text-size22 font-medium mt-10">
              أظهرت وثيقة قضائية يوم الجمعة أن شركة التدقيق السابقة Prager Metis
              التابعة لشركة FTX المفلسة، اتُهمت بانتهاك قواعد استقلال مدققي
              الحسابات في الولايات المتحدة من قبل لجنة الأوراق المالية
              والبورصة . وتزعم هيئة الأوراق المالية والبورصة أن الشركة ساعدت
              عملائها – بما في ذلك 62 كيانًا مسجلاً لدى الهيئة التنظيمية – على
              انتهاك قوانين الأوراق المالية الفيدرالية. ويسعى إلى إصدار أمر
              قضائي ضد المدقق ويريد منه دفع غرامات والتخلي عن أي أرباح قام
              Prager Metis بمراجعة حسابات لشركة FTX وأبلغ عن إيرادات بقيمة مليار
              دولار في عام 2021، حسبما أفاد CoinDesk في نوفمبر، في نفس اليوم
              الذي تقدمت فيه FTX بطلب للإفلاس في الولايات المتحدة – مع عجز قدره
              7 مليارات دولار في ميزانيتها العمومية. كان لدى الشركة أيضًا خطط
              لفتح موقع في Metaverse. ومع ذلك، فإن شكوى هيئة الأوراق المالية
              والبورصة لا تركز على علاقات المدقق مع FTX ولكن على الاتفاقيات التي
              أبرمتها الشركة مع عملائها العديدين. وفقًا للإيداع المقدم يوم
              الجمعة إلى المحكمة الجزئية الأمريكية للمنطقة الجنوبية من فلوريدا،
              انتهكت شركة Prager Metis  معايير استقلالية مراجعي الحسابات من خلال
              الدخول في اتفاقيات تضمنت أحكام التعويض – حيث وافق العملاء على
              إعفاء Prager من المسؤوليات والتكاليف من خدماتها “التي تعزى إلى أي
              تحريفات معروفة من قبل الإدارة. وزعمت الهيئة التنظيمية أيضًا أنه تم
              إخطار المدقق بهذه الانتهاكات منذ يناير 2019 على الأقل رابط المصدر
              / إضغط هنا
            </p>
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-3 hidden md:block">
            <img
              src="/assets/ads/ads-one.svg"
              className="w-full  h-auto mb-16 rounded-md"
            />
            <img
              src="/assets/ads/ads-two.svg"
              className="w-full h-auto rounded-md"
            />
          </div>
        </div>

        <div className="related-news mt-16">
          <div className="flex items-center justify-between">
            <h3 className=" text-[28px] text-black font-medium">
              {t("similarArticles")}
            </h3>
            <Link href="/news" className="btn-yellow !text-size22">
              <span>{t("more")}</span>
            </Link>
          </div>

          <ul className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8 pt-16">
            {newsListLength.map((item, index) => (
              <li key={index}>
                <CardNews img={``} title={""} />
              </li>
            ))}
          </ul>
        </div>

        <div className="comments lg:flex block items-end justify-between mt-32">
          <div className="bg-[#EAF1FA] p-4 w-full lg:w-[60%] rounded-md max-[600px]:mb-4">
            <div className="flex items-center justify-between">
              <h3 className=" text-[28px] text-black font-medium ">
                {t("comment")}
              </h3>
              <button className="btn-yellow !text-size22 !px-6 !py-2">
                <span>{t("publish")}</span>
              </button>
            </div>
            <textarea
              id="message"
              rows={7}
              className="mt-4 w-full rounded-md  shadow-sm sm:text-sm  text-black  indent-2.5 !outline-none resize-none"
            />
          </div>

          <div className="share">
            <h3 className=" text-size24 text-primary font-medium mb-6">
              {t("share")}
            </h3>
            <ul className="flex justify-center gap-6 sm:mt-0 lg:justify-end">
              {socialMediaList.map((link, index) => {
                const IconComponent = link.src;
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-link"
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsDetails;

import CardNews from "@/app/_components/newCard";
import { useTranslations } from "next-intl";

function News() {
  const t = useTranslations("News");
  const visualsListLength = Array.from({ length: 18 });
  return (
    <section className="news py-28">
      <h1 className="text-primary text-[4rem] font-semibold text-center mb-4">
        {t("title")}
      </h1>

      <ul className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-1 container pt-20">
        {visualsListLength.map((item, index) => (
          <li key={index}>
            <CardNews />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default News;

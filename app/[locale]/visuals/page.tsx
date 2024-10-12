import Card from "@/app/_components/card";
import { useTranslations } from "next-intl";
import Link from "next/link";

function Visuals() {
  const t = useTranslations("Visuals");
  const visualsListLength = Array.from({ length: 18 });
  return (
    <section className="visuals py-28 container">
      <h1 className="text-primary text-size22 md:text-[4rem] font-semibold text-center mb-4">
        {t("title")}
      </h1>
      <p className="text-black text-size16 md:text-[28px] font-medium text-center">
        {t("description")}
      </p>

      <ul className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2 gap-4 pt-20">
        {visualsListLength.map((item, index) => (
          <li key={index}>
            <Link href={`visuals/${1}`}>
              <Card
                img={`assets/mock-image.png`}
                title={"التعريف بالعملات الرقمية وفلسفة البيتكوين"}
              />
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-center py-16">
        <button className="btn-yellow">{t("more")}</button>
      </div>
    </section>
  );
}

export default Visuals;

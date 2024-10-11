import Card from "@/app/_components/card";
import { useTranslations } from "next-intl";
import Link from "next/link";

function Visuals() {
  const t = useTranslations("Visuals");
  const visualsListLength = Array.from({ length: 18 });
  return (
    <section className="visuals py-28">
      <h1 className="text-primary text-[4rem] font-semibold text-center mb-4">
        {t("title")}
      </h1>
      <p className="text-black text-[28px] font-medium text-center">
        {t("description")}
      </p>

      <ul className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 container pt-20">
        {visualsListLength.map((item, index) => (
          <li key={index}>
            <Link href={`visuals/${1}`}>
              <Card />
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

"use client";
import Card from "@/app/_components/card";
import axiosInstance from "@/app/_lib/axios";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

function Visuals() {
  const t = useTranslations("Visuals");
  const visualsListLength = Array.from({ length: 18 });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("visions?limit=10&page=1");
        setData(response.data.data.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="visuals py-28 container">
      <h1 className="text-primary text-size22 md:text-[4rem] font-semibold text-center mb-4">
        {t("title")}
      </h1>
      <p className="text-black text-size16 md:text-[28px] font-medium text-center">
        {t("description")}
      </p>

      <ul className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2 gap-4 pt-20">
        {data?.map((item: any, index) => (
          <li key={index}>
            <Link href={`visuals/${item?.id}`}>
              <Card item={item} />
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

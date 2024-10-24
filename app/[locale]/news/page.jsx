"use client";
import CardNews from "@/app/_components/newCard";
import axiosInstance from "@/app/_lib/axios";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

function News() {
  const t = useTranslations("News");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("news?limit=10&page=1");
        setData(response.data.data.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="news py-28">
      <h1 className="text-primary text-size22 md:text-[4rem] font-semibold text-center mb-4">
        {t("title")}
      </h1>

      <ul className="grid grid-cols-2 lg:grid-cols-4 container pt-20">
        {data.map((item, index) => (
          <li key={index}>
            <Link href={`news/${item?.id}`}>
              <CardNews item={item} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default News;

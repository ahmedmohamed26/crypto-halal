"use client";
import Card from "@/app/_components/card";
import axiosInstance from "@/app/_lib/axios";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

function StudyAndResearch() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState<any>({});
  const t = useTranslations("StudyAndResearch");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("researches?limit=10&page=1");
        setData(response.data.data.items);
        setPagination(response.data.data.meta);
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <section className="visions container py-28">
      <h1 className="text-primary text-size22 md:text-[4rem] font-semibold text-center mb-4">
        {t("title")}
      </h1>
      <p className="text-black text-size16 md:text-[28px] font-regular text-center">
        {t("description")}
      </p>

      <ul className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2 gap-4 pt-20">
        {data?.map((item: any, index: number) => (
          <li key={index}>
            <Link href={`study-research/${item?.id}`}>
              <Card item={item} />
            </Link>
          </li>
        ))}
      </ul>
      {pagination.next_page !== null && (
        <div className="flex justify-center py-16">
          <button className="btn-yellow">{t("more")}</button>
        </div>
      )}
    </section>
  );
}

export default StudyAndResearch;

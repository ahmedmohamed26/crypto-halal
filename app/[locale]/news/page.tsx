"use client";
import axiosInstance from "@/app/_lib/axios";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const CardNews = dynamic(() => import("@/app/_components/CardNews"));

function News() {
  const t = useTranslations("News");
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        `news?limit=10&page=${currentPage}`
      );
      setData((prevData) => [...prevData, ...response.data.data.items]);
      setPagination(response.data.data.meta);
    } catch (error) {}
  };
  const getMoreData = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

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

      {pagination.next_page !== null && (
        <div className="flex justify-center py-16">
          <button className="btn-yellow" onClick={() => getMoreData()}>
            {t("more")}
          </button>
        </div>
      )}
    </section>
  );
}

export default News;

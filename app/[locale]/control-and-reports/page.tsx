"use client";
import axiosInstance from "@/app/_lib/axios";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
const Card = dynamic(() => import("@/app/_components/card"));

function ControlAndReports() {
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const t = useTranslations("controlAndAuditReports");

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        `supervisions?limit=10&page=${currentPage}`
      );
      setData((prevData) => [...prevData, ...response.data.data.items]);
      setPagination(response.data.data.meta);
    } catch (error) {}
  };
  const getMoreData = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <section className="visions container py-28">
      <h1 className="text-primary text-size22 md:text-[4rem] font-semibold text-center mb-4">
        {t("title")}
      </h1>
      <ul className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2 gap-4 pt-20">
        {data?.map((item: any, index: number) => (
          <li key={index}>
            <Link href={`control-and-reports/${item?.id}`} prefetch={false}>
              <Card item={item} />
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

export default ControlAndReports;
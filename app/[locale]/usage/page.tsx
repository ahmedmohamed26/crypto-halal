"use client";
import axiosInstance from "@/app/_lib/axios";
import React from "react";
import { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import { useTranslations } from "next-intl";

function Usage() {
  const [data, setData] = useState<any>(null);
  const t = useTranslations("Footer");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("info");
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container py-28">
      <h1 className="text-primary text-size22 md:text-[4rem] font-semibold text-center mb-16">
        {t("termsOfUse")}
      </h1>
      <p className="w-[75%] text-black text-[28px] mb-[2rem]">
        {DOMPurify.sanitize(data?.usage, {
          USE_PROFILES: { html: true },
        })}
      </p>
    </div>
  );
}

export default Usage;

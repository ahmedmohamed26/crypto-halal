"use client";
import React from "react";
import axiosInstance from "@/app/_lib/axios";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

function Currencies() {
  const t = useTranslations("Currencies");
  const [data, setData] = useState([]);
  <style jsx>{`
    .custom-select {
      color: white !important;
    }
    .custom-select option {
      background-color: white !important;
      color: black !important;
      font-size: 16px !important;
    }
  `}</style>;
  return (
    <section className="bg-[#0b2962] py-28">
      <div className="container">
        <h1 className="text-center text-white text-[50px] font-semibold">
          {t("currencyList")}
        </h1>

        <div className="flex items-center justify-between">
          <input />
          <div className="select-parent">
            <div>
              <select
                name="HeadlineAct"
                className="w-full bg-transparent custom-select border-white border-[1px] rounded-lg sm:text-sm"
              >
                <option value="">Please select</option>
                <option value="JM">John Mayer</option>
                <option value="SRV">Stevie Ray Vaughn</option>
                <option value="JH">Jimi Hendrix</option>
                <option value="BBK">B.B King</option>
                <option value="AK">Albert King</option>
                <option value="BG">Buddy Guy</option>
                <option value="EC">Eric Clapton</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Currencies;

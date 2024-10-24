"use client";
import axiosInstance from "@/app/_lib/axios";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tab,
  Tabs,
  User,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import HistoricalData from "./historicalData";
import React from "react";

export default function CurrencyDetails({
  params,
}: {
  params: { id: string };
}) {
  const t = useTranslations("Currencies");
  const [currentTab, setCurrentTab] = useState("historicalData");
  const [currencyDetails, setCurrencyDetails] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`coins/${params.id}`);
        setCurrencyDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="bg-[#0b2962] py-28">
      <div className="container">
        <h1 className="text-center text-white text-[50px] font-semibold">
          {t("currencyCard")}
        </h1>

        <div className=" w-full mt-16">
          <Table
            aria-label="Example static collection table"
            classNames={{
              table: "shadow-none p-0 m-0 ",
              base: "bg-[#3263288] shadow-none p-0 m-0 ",
              th: "bg-[#303c42] text-yellow py-4",
              td: " text-white !text-size22 font-regular",
              wrapper:
                "bg-[#263238] rounded-tl-lg rounded-tr-lg rounded-bl-[0]  rounded-br-[0]",
              tbody: "",
              tr: "border-b-1 border-[#667085] last:border-none",
            }}
          >
            <TableHeader>
              <TableColumn>{t("coin")}</TableColumn>
              <TableColumn>{t("price")}</TableColumn>
              <TableColumn>{t("24hChange")}</TableColumn>
              <TableColumn>{t("marketCap")}</TableColumn>
              <TableColumn>{t("totalSupply")}</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>
                  {" "}
                  <User
                    avatarProps={{ radius: "full", src: currencyDetails?.img }}
                    description={currencyDetails?.symbol}
                    name={currencyDetails?.name}
                  ></User>
                </TableCell>
                <TableCell>
                  <p className="text-bold text-size16 capitalize">
                    {Number.parseFloat(currencyDetails?.price_usd).toFixed(2)}{" "}
                    {"$"}
                  </p>
                </TableCell>
                <TableCell>
                  <p
                    className={`${
                      currencyDetails?.percent_change_24h > 0
                        ? "text-green-500"
                        : "text-red-500"
                    } text-size16 font-regular  capitalize bg-white p-2 w-[70px] rounded text-center`}
                  >
                    {Number.parseFloat(
                      currencyDetails?.percent_change_24h
                    ).toFixed(2)}
                  </p>
                </TableCell>
                <TableCell>
                  {" "}
                  <p className="font-regular text-size16 capitalize text-start">
                    {Number.parseFloat(currencyDetails?.market_cap_usd).toFixed(
                      2
                    )}{" "}
                    {"$"}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="font-regular text-size16 capitalize text-start">
                    {currencyDetails?.total_supply}
                  </p>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div>
          <div className="bg-[#1E3760] mt-7 rounded-md p-4">
            <h2 className="text-[22px] font-regular text-white">
              {t("projectType")} : <span>{currencyDetails?.projectType} </span>
            </h2>
          </div>
          <p className="text-size18 font-regular text-white w-full md:w-[50%] mt-8 leading-10">
            {currencyDetails?.description}
          </p>
        </div>

        <div>
          <div className="bg-[#1E3760] mt-7 rounded-md p-4">
            <h2 className="text-[22px] font-regular text-white">
              {t("projectServices")}
            </h2>
          </div>
          <p className="text-size18 font-regular text-white w-full md:w-[50%] mt-8 leading-10">
            {currencyDetails?.services}
          </p>
        </div>

        <div
          className={`${
            currencyDetails?.judgement == 0
              ? "bg-[#059669]"
              : currencyDetails?.judgement == 1
              ? "bg-red-500"
              : "bg-orange-500"
          }  mt-9 rounded-md p-4 w-auto inline-block`}
        >
          <h2 className="text-[22px] font-regular text-white">
            {t("projectRule")} :
            {currencyDetails?.judgement == 0 ? (
              <span>{t("available")}</span>
            ) : currencyDetails?.judgement == 1 ? (
              <span>{t("unavailable")}</span>
            ) : (
              <span>{t("suspect")}</span>
            )}
          </h2>
        </div>

        <div className="lg:flex md:block w-full items-start justify-between mt-16 mb-8">
          <h6 className="lg:text-size20 text-size16 text-white font-regular mt-3">
            {t("additionalInformation")}
          </h6>
          <Tabs
            aria-label="Options"
            variant="underlined"
            isVertical={false}
            size="lg"
            classNames={{
              cursor: "w-full bg-yellow",
              tab: "h-[50px] ",
              tabContent: "text-white lg:text-size18 text-size14 my-4",
              panel: "w-full",
            }}
            onSelectionChange={(e: any) => setCurrentTab(e)}
          >
            <Tab
              key="historicalData"
              title={
                <div className="flex items-center space-x-2 text-white">
                  <span className="mx-2">{t("historicalData")}</span>
                  <img className="w-[20px]" src="/assets/calendar.svg" />
                </div>
              }
            />

            <Tab
              key="charts"
              title={
                <div className="flex items-center space-x-2 text-white">
                  <span className="mx-2">{t("charts")}</span>
                  <img className="w-[20px]" src="/assets/charts.svg" />
                </div>
              }
            />
          </Tabs>
        </div>
        {currentTab === "historicalData" ? <HistoricalData /> : null}
      </div>
    </section>
  );
}

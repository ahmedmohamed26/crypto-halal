"use client";
import axiosInstance from "@/app/_lib/axios";
import {
  Button,
  DateRangePicker,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
  User,
} from "@nextui-org/react";
import DOMPurify from "isomorphic-dompurify";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { ChartData } from "./chartData";
import { HistoricalData } from "./historicalData";

const dateFormat = (dateObj: any) => {
  const dateStr = `${String(dateObj.year)}-${String(dateObj.month).padStart(
    2,
    "0"
  )}-${String(dateObj.day).padStart(2, "0")}`;
  const date = new Date(dateStr);
  return date.getTime();
};

export default function CurrencyDetails({
  params,
}: {
  params: { id: string };
}) {
  const t = useTranslations("Currencies");
  const [currentTab, setCurrentTab] = useState("historicalData");
  const [currencyDetails, setCurrencyDetails] = useState<any>({});
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [dateValue, setDateValue] = useState<any>(null);

  const selectDate = (e: any) => {
    setStartDate(dateFormat(e.start));
    setEndDate(dateFormat(e.end));
    setDateValue(e);
  };

  const setDateRange = () => {
    setStartDate(null);
    setEndDate(null);
    setDateValue(null);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`coins/${params?.id}`, {
          params: {
            start_date: startDate,
            end_date: endDate,
          },
        });
        setCurrencyDetails(response.data.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [startDate, endDate]);

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
                    {currencyDetails?.price_usd != null
                      ? `${Number.parseFloat(currencyDetails.price_usd).toFixed(
                          2
                        )} $`
                      : "0"}
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
                    {currencyDetails?.percent_change_24h
                      ? Number.parseFloat(
                          currencyDetails.percent_change_24h
                        ).toFixed(2)
                      : "-"}
                  </p>
                </TableCell>
                <TableCell>
                  {" "}
                  <p className="font-regular text-size16 capitalize text-start">
                    {currencyDetails?.market_cap_usd != null
                      ? `${Number.parseFloat(
                          currencyDetails.market_cap_usd
                        ).toFixed(2)} $`
                      : "0"}
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
            {DOMPurify.sanitize(
              currencyDetails?.description.replace(/&nbsp;/g, " "),
              {
                USE_PROFILES: { html: false },
              }
            )}
          </p>
        </div>

        <div>
          <div className="bg-[#1E3760] mt-7 rounded-md p-4">
            <h2 className="text-[22px] font-regular text-white">
              {t("projectServices")}
            </h2>
          </div>
          <p className="text-size18 font-regular text-white w-full md:w-[50%] mt-8 leading-10">
            {DOMPurify.sanitize(
              currencyDetails?.services.replace(/&nbsp;/g, " "),
              {
                USE_PROFILES: { html: false },
              }
            )}
          </p>
        </div>

        <div>
          <div className="bg-[#1E3760] mt-7 rounded-md p-4">
            <h2 className="text-[22px] font-regular text-white">
              {t("UseOfCurrency")}
            </h2>
          </div>
          <p className="text-size18 font-regular text-white w-full md:w-[50%] mt-8 leading-10">
            {DOMPurify.sanitize(currencyDetails?.uses.replace(/&nbsp;/g, " "), {
              USE_PROFILES: { html: false },
            })}
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
        {currencyDetails?.judgnote && (
          <div>
            <div className="bg-[#1E3760] mt-7 rounded-md p-4">
              <h2 className="text-[22px] font-regular text-white">
                {t("judgnote")}
              </h2>
            </div>
            <p className="text-size18 font-regular text-white w-full md:w-[50%] mt-8 leading-10">
              {DOMPurify.sanitize(
                currencyDetails?.judgnote.replace(/&nbsp;/g, " "),
                {
                  USE_PROFILES: { html: true },
                }
              )}
            </p>
          </div>
        )}

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
                  <img
                    className="w-[20px]"
                    src="/assets/calendar.svg"
                    loading="lazy"
                  />
                </div>
              }
            />

            <Tab
              key="charts"
              title={
                <div className="flex items-center space-x-2 text-white">
                  <span className="mx-2">{t("charts")}</span>
                  <img
                    className="w-[20px]"
                    src="/assets/charts.svg"
                    loading="lazy"
                  />
                </div>
              }
            />
          </Tabs>
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap">
          <DateRangePicker
            visibleMonths={1}
            onChange={(e) => selectDate(e)}
            value={dateValue}
            startContent={
              <Button variant="light" onClick={() => setDateRange()} isIconOnly>
                <span className="flex items-center justify-center w-8 h-8 text-gray-500 rounded-full border-[1px] border-green-500">
                  X
                </span>
              </Button>
            }
          />
        </div>
        {currentTab === "historicalData" ? (
          <HistoricalData
            historical={currencyDetails?.historical}
            isLoading={isLoading}
          />
        ) : (
          <div className="bg-white mt-4 rounded-md">
            <ChartData data={currencyDetails.chart} isLoading={isLoading} />
          </div>
        )}
      </div>
    </section>
  );
}

"use client";
import axiosInstance from "@/app/_lib/axios";
import {
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Currencies() {
  const t = useTranslations("Currencies");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [judgementStatus, setJudgementStatus] = useState<any>(null);
  const [searchKey, setSearchKey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState<any>({});
  const locale = useLocale();
  const judgements = [
    { key: "", label: t("allJudgement") },
    { key: "available", label: t("available") },
    { key: "unavailable", label: t("unavailable") },
    { key: "suspect", label: t("suspect") },
  ];

  const columns = [
    { name: t("coin"), uid: "name" },
    { name: t("price"), uid: "price_usd" },
    { name: t("24hChange"), uid: "percent_change_24h" },
    { name: t("marketCap"), uid: "market_cap_usd" },
    { name: t("details"), uid: "details" },
  ];

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`coins`, {
          params: {
            limit: 15,
            page: currentPage,
            judgement: judgementStatus,
            search: searchKey,
          },
        });

        setData(response.data.data.items);
        setPagination(response.data.data.meta);
        setIsLoading(false);
      } catch (error: any) {
        // toast.error(t("subscriptionErrMsg"));
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, searchKey, judgementStatus]);

  useEffect(() => {
    setCurrentPage(1);
    setPagination(null);
  }, [searchKey, judgementStatus]);

  const renderCell = React.useCallback((user: any, columnKey: any) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "full", src: user?.img }}
            description={user?.symbol}
            name={cellValue}
          ></User>
        );
      case "price_usd":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-size16 capitalize">
              {Number.parseFloat(user?.price_usd).toFixed(2)} {"$"}
            </p>
          </div>
        );
      case "percent_change_24h":
        return (
          <div className="flex flex-col">
            <p
              className={`${
                user?.percent_change_24h > 0 ? "text-green-500" : "text-red-500"
              } text-size16 font-regular  capitalize bg-white p-2 w-[70px] rounded text-center`}
            >
              {user?.percent_change_24h
                ? Number.parseFloat(user.percent_change_24h).toFixed(2)
                : "-"}
            </p>
          </div>
        );
      case "market_cap_usd":
        return (
          <div className="flex flex-col">
            <p className="font-regular text-size16 capitalize text-start">
              {user?.market_cap_usd != null
                ? `${Number.parseFloat(user.market_cap_usd).toFixed(2)} $`
                : "0"}
            </p>
          </div>
        );

      case "details":
        return (
          <div className="relative flex items-center gap-2">
            <Link
              prefetch={false}
              href={`/currencies/${user.id}`}
              className="rounded bg-[#173EAD] px-8 py-3 font-regular text-white text-[14px] md:text-size16"
            >
              {t("details")}
            </Link>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <section
      className="py-28"
      style={{
        background:
          "linear-gradient(140deg, rgba(26,81,154,1) 0%, rgba(16,36,73,1) 25%, rgba(28,74,112,1) 100%)",
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        rtl={false}
        theme="light"
      />
      <div className="container">
        <h1 className="text-center text-white text-[50px] font-semibold">
          {t("currencyList")}
        </h1>

        <div className="md:flex md:flex-row sm:flex-col items-center justify-between mt-16">
          <Input
            type="text"
            placeholder={t("search")}
            className="w-full md:w-[40%] focus:outline-white mb-4 md:mb-0"
            onChange={(e: any) => setSearchKey(e.target.value)}
            onClear={() => setSearchKey(null)}
            startContent={
              <svg
                aria-hidden="true"
                fill="none"
                focusable="false"
                height="1em"
                role="presentation"
                viewBox="0 0 24 24"
                width="1em"
                className="text-xl text-default-400 pointer-events-none"
              >
                <path
                  d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <path
                  d="M22 22L20 20"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            }
          />

          <div className="md:flex md:flex-row sm:flex-col items-center justify-between w-full md:w-[30%]">
            <div className="w-full mb-4 md:mb-0">
              <div>
                <Select
                  placeholder={t("provisions")}
                  classNames={{
                    label: "!text-white",
                  }}
                  defaultSelectedKeys={[""]}
                  onChange={(e) => setJudgementStatus(e.target.value)}
                >
                  {judgements.map((judgement) => (
                    <SelectItem key={judgement.key}>
                      {judgement.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full mt-16">
          <Table
            aria-label="table with custom cells overflow-auto"
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
            // bottomContent={
            //   pagination.current_page > 0 ? (
            //     <div className="flex justify-center w-full  bg-white h-12 rounded-bl-lg rounded-br-lg">
            //       <Pagination
            //         isCompact
            //         showControls={false}
            //         showShadow
            //         color="primary"
            //         total={pagination?.last_page}
            //         page={pagination.current_page}
            //         onChange={setCurrentPage}
            //         classNames={{
            //           wrapper: " py-4 mt-2 h-8 rounded",
            //           item: "text-small rounded-md bg-white",
            //           cursor:
            //             "!border-[2px] !border-primary bg-transparent shadow-lg text-primary font-bold",
            //         }}
            //       />
            //     </div>
            //   ) : null
            // }

            // last:border-none
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody
              items={data}
              isLoading={isLoading}
              emptyContent={t("noDataShow")}
              loadingContent={<Spinner size="lg" color="white" />}
            >
              {(item: any) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
          {pagination?.current_page > 0 && (
            <div className="flex justify-center w-full  bg-white h-12 rounded-bl-lg rounded-br-lg">
              <Pagination
                color="primary"
                isCompact
                total={pagination?.last_page}
                page={pagination.current_page}
                onChange={setCurrentPage}
                classNames={{
                  wrapper: " py-4 mt-2 h-8 rounded",
                  item: "text-small rounded-md bg-white",
                  cursor:
                    "!border-[2px] !border-primary bg-transparent shadow-lg text-primary font-bold",
                  forwardIcon: "scale-x-[-1]",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
//  "flex flex-row-reverse py-4 mt-2 h-8 rounded justify-center"

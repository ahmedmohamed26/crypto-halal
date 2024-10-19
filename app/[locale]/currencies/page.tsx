"use client";
import {
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { Pagination } from "@nextui-org/react";
import Link from "next/link";

export default function Currencies() {
  const t = useTranslations("Currencies");
  const [data, setData] = useState([]);

  const columns = [
    { name: t("coin"), uid: "coin" },
    { name: t("price"), uid: "price" },
    { name: t("24hChange"), uid: "hChange" },
    { name: t("marketCap"), uid: "marketCap" },
    { name: t("details"), uid: "details" },
  ];

  const users = [
    {
      id: 1,
      coin: "Tony Reichert",
      price: "3,002.77",
      hChange: "+44.00",
      marketCap: "B 279.58 $",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      details: "tony.reichert@example.com",
    },
    {
      id: 2,
      coin: "Tony Reichert",
      price: "3,002.77",
      hChange: "+44.00",
      marketCap: "B 279.58 $",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      details: "tony.reichert@example.com",
    },
    {
      id: 3,
      coin: "Tony Reichert",
      price: "3,002.77",
      hChange: "+44.00",
      marketCap: "B 279.58 $",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      details: "tony.reichert@example.com",
    },
    {
      id: 4,
      coin: "Tony Reichert",
      price: "3,002.77",
      hChange: "+44.00",
      marketCap: "B 279.58 $",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      details: "tony.reichert@example.com",
    },
    {
      id: 5,
      coin: "Tony Reichert",
      price: "3,002.77",
      hChange: "+44.00",
      marketCap: "B 279.58 $",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      details: "tony.reichert@example.com",
    },
  ];

  const renderCell = React.useCallback((user: any, columnKey: any) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "coin":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.coin}
            name={cellValue}
          >
            {user.coin}
          </User>
        );
      case "price":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{user.price}</p>
          </div>
        );
      case "hChange":
        return (
          <div className="flex flex-col">
            <p className="text-size16 text-black text-bold text-sm capitalize bg-white p-2 w-[50%] rounded">
              {user.hChange}
            </p>
          </div>
        );
      case "marketCap":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{user.marketCap}</p>
          </div>
        );

      case "details":
        return (
          <div className="relative flex items-center gap-2">
            <Link
              href="/currencies/1"
              className="rounded bg-[#173EAD] p-3 font-medium text-white text-[14px] md:text-size16"
            >
              {t("details")}
            </Link>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  const provisions = [
    { key: "1", label: "كل الاحكام" },
    { key: "2", label: "مباح" },
    { key: "3", label: "غير مباح" },
    { key: "4", label: "مشتبه به" },
  ];

  const currencies = [
    { key: "1", label: "USD" },
    { key: "2", label: "EGP" },
  ];

  return (
    <section className="bg-[#0b2962] py-28">
      <div className="container">
        <h1 className="text-center text-white text-[50px] font-semibold">
          {t("currencyList")}
        </h1>

        <div className="flex md:flex-row sm:flex-col items-center justify-between mt-16">
          <Input
            type="text"
            placeholder={t("search")}
            className="w-full md:w-[40%] focus:outline-white mb-4 md:mb-0"
            // variant="bordered"
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

          <div className="flex md:flex-row sm:flex-col items-center justify-between w-full md:w-[30%]">
            <div className="w-full md:w-[60%] mb-4 md:mb-0">
              <div>
                <Select
                  placeholder={t("provisions")}
                  // variant="bordered"
                  classNames={{
                    label: "!text-white",
                  }}
                >
                  {provisions.map((provision) => (
                    <SelectItem key={provision.key}>
                      {provision.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
            <div className="w-full md:w-[30%]">
              <div>
                <Select
                  placeholder={t("currency")}
                  //  variant="bordered"
                >
                  {currencies.map((currency) => (
                    <SelectItem key={currency.key}>{currency.label}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full mt-16  bg-transparent">
          <Table
            aria-label="table with custom cells overflow-auto"
            classNames={{
              table: "p-0 m-0",
              base: "border-1  border-white rounded",
              th: "bg-[#203B61] text-yellow py-4 border-none",
              td: " text-white !text-size22 font-medium",
              wrapper: "bg-transparent",
              tbody: "bg-transparent",
              tr: "  border-b-1  border-[#667085] last:border-none",
            }}
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
            <TableBody items={users}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="mt-16 flex justify-center">
            <Pagination color="primary" isCompact total={10} initialPage={1} />
          </div>
        </div>
      </div>
    </section>
  );
}

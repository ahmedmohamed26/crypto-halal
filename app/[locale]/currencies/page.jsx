"use client";
import React from "react";
import axiosInstance from "@/app/_lib/axios";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import {
  Select,
  SelectItem,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";

function Currencies() {
  const t = useTranslations("Currencies");
  const [data, setData] = useState([]);
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

        <div className="flex items-center justify-between mt-16">
          <Input
            type="text"
            placeholder={t("search")}
            className="w-full md:w-[40%]"
            variant="bordered"
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

          <div className="flex items-center justify-between w-full md:w-[30%]">
            <div className="w-full md:w-[60%]">
              <div>
                <Select placeholder={t("provisions")} variant="bordered">
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
                <Select placeholder={t("currency")} variant="bordered">
                  {currencies.map((currency) => (
                    <SelectItem key={currency.key}>{currency.label}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          <div className="table mt-16">
            <Table aria-label="Example table with custom cells">
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default Currencies;

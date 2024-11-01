import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";

interface HistoricalProps {
  historical: any;
  isLoading: boolean;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export const HistoricalData: React.FC<HistoricalProps> = ({
  historical = [],
  isLoading,
}) => {
  const t = useTranslations("Currencies");

  const columns = [
    { name: t("volume"), uid: "volume" },
    { name: t("low"), uid: "low" },
    { name: t("high"), uid: "high" },
    { name: t("close"), uid: "close" },
    { name: t("open"), uid: "open" },
    { name: t("date"), uid: "timestamp" },
  ];

  const renderCell = React.useCallback((item: any, columnKey: any) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "volume":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-black ">
              {"$"} {""}
              {parseFloat(item?.quote?.USD?.volume.toFixed(4))}
            </p>
          </div>
        );
      case "low":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-black ">
              {"$"} {""}
              {parseFloat(item?.quote?.USD?.low.toFixed(4))}
            </p>
          </div>
        );
      case "high":
        return (
          <div className="flex flex-col">
            <p className="text-size16 text-black text-bold text-sm capitalize">
              {"$"} {""}
              {parseFloat(item?.quote?.USD?.high.toFixed(4))}
            </p>
          </div>
        );
      case "close":
        return (
          <div className="flex flex-col">
            <p className="text-size16 text-black text-bold text-sm capitalize">
              {"$"} {""}
              {parseFloat(item?.quote?.USD?.close.toFixed(4))}
            </p>
          </div>
        );
      case "open":
        return (
          <div className="flex flex-col">
            <p className="text-size16 text-black text-bold text-sm capitalize">
              {"$"} {""}
              {parseFloat(item?.quote?.USD?.open.toFixed(4))}
            </p>
          </div>
        );
      case "timestamp":
        return (
          <div className="flex flex-col">
            <p className="text-size16 text-black text-bold text-sm capitalize">
              {formatDate(item?.quote?.USD?.timestamp)}
            </p>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <div className=" w-full mt-8  bg-white rounded">
        <Table
          aria-label="table with custom cells overflow-auto "
          classNames={{
            table: "p-0 m-0",
            thead: "border-none",
            th: "bg-white text-primary !text-[13px] font-regular py-6",
            td: "text-white !text-size22 font-regular border-b-1 border-yellow",
            wrapper: "bg-gray p-0",
            tbody: "",
            //   tr: "border-b-1 border-yellow last:border-none",
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

          <TableBody
            items={historical}
            isLoading={isLoading}
            emptyContent={t("noHistoricalData")}
            loadingContent={<Spinner size="lg" color="primary" />}
          >
            {(item: any) => (
              <TableRow key={item?.quote?.USD?.close}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

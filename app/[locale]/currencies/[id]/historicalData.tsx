import {
  DateRangePicker,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";
export default function HistoricalData() {
  const t = useTranslations("Currencies");

  const columns = [
    { name: t("coin"), uid: "coin" },
    { name: t("price"), uid: "price" },
    { name: t("24hChange"), uid: "hChange" },
    { name: t("marketCap"), uid: "marketCap" },
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
            <p className="text-bold text-sm capitalize text-black ">
              {user.price}
            </p>
          </div>
        );
      case "hChange":
        return (
          <div className="flex flex-col">
            <p className="text-size16 text-black text-bold text-sm capitalize">
              {user.hChange}
            </p>
          </div>
        );
      case "marketCap":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-black ">
              {user.marketCap}
            </p>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <div className="flex w-full flex-wrap md:flex-nowrap">
        <DateRangePicker visibleMonths={1} />
      </div>
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
    </>
  );
}

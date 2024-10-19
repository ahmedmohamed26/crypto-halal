"use client";

import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import EditProfile from "./editProfile";
import Subscription from "./subscription";
import ChangePassword from "./changePassword";

export default function Profile() {
  const t = useTranslations("Profile");

  return (
    <section className="container py-28">
      <Tabs
        aria-label="Options"
        isVertical={true}
        size="lg"
        classNames={{
          tabList:
            "w-[20vw] h-[400px] relative p-8 rounded-md border-yellow border-[1px]",
          cursor: "w-full bg-transparent border-none shadow-none ",
          tab: " h-[50px] border-none shadow-none ",
          tabContent: "group-data-[selected=true]:text-primary  text-size18",
          panel: "w-full",
        }}
      >
        <Tab
          key="editProfile"
          title={
            <div className="flex items-center gap-2">
              <img className="w-[20px]" src="/assets/edit-profile.svg" />
              <span>{t("editProfile")}</span>
            </div>
          }
          className="bg-transparent flex justify-start"
        >
          <Card className="bg-[#f1f7fd] border-none shadow-none w-full">
            <CardBody>
              <EditProfile />
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key="subscription"
          title={
            <div className="flex items-center gap-2">
              <img className="w-[20px]" src="/assets/subscription.svg" />
              <span>{t("subscription")}</span>
            </div>
          }
          className="bg-transparent flex justify-start"
        >
          <Card className="bg-[#f1f7fd] border-none shadow-none  w-full">
            <CardBody className="text-start">
              <Subscription />
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key="protectionAndPassword"
          title={
            <div className="flex items-center gap-2">
              <img
                className="w-[20px]"
                src="/assets/protectionAndPassword.svg"
              />
              <span>{t("protectionAndPassword")}</span>
            </div>
          }
          className="bg-transparent flex justify-start"
        >
          <Card className="bg-[#f1f7fd] border-none shadow-none  w-full">
            <CardBody className="text-start">
              <ChangePassword />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </section>
  );
}

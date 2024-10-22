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
            "xl:w-[30vw] md:w-[35vw] w-[28vw] h-[500px] relative p-8 rounded-lg border-yellow border-[2px]",
          cursor:
            "w-full bg-transparent  shadow-none border-b-2 border-black rounded-none ",
          tab: " h-[50px] border-none shadow-none ",
          tabContent:
            "group-data-[selected=true]:text-primary border-none text-size18",
          panel: "w-full",
        }}
      >
        <Tab
          key="editProfile"
          title={
            <div className="flex items-center gap-2">
              <img className="w-[20px]" src="/assets/edit-profile.svg" />
              <span className="hidden md:block">{t("editProfile")}</span>
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
              <span className="hidden md:block">{t("subscription")}</span>
            </div>
          }
          className="bg-transparent flex justify-start"
        >
          <Card className="bg-[#f1f7fd] border-none shadow-none w-full">
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
              <span className="hidden md:block">
                {t("protectionAndPassword")}
              </span>
            </div>
          }
          className="bg-transparent flex justify-start !outline-transparent"
        >
          <Card className="bg-[#f1f7fd] border-none shadow-none w-full !focus:outline-none">
            <CardBody className="text-start">
              <ChangePassword />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </section>
  );
}

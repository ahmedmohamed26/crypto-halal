import { useState } from "react";
import { useUser } from "../_context/UserContext";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
} from "@nextui-org/react";
import Link from "next/link";
import axiosInstance from "../_lib/axios";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, clearUser } = useUser();
  const t = useTranslations("Profile");
  const router = useRouter();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get("logout");
      clearUser();
      router.push("/login");
    } catch (error: any) {}
  };

  const userInitial = user && user.name.charAt(0).toUpperCase();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="bg-yellow" variant="flat" isIconOnly radius="full">
          <span className=" text-white text-size18">
            {userInitial || "Profile"}
          </span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        className="hover:bg-transparent"
      >
        <DropdownItem key="new" color={"undefined" as any}>
          <div className="w-full flex justify-center items-center">
            <h3 className="bg-yellow rounded-full py-3 px-4  text-white text-size18 inline-block">
              {userInitial || "Profile"}
            </h3>
          </div>
          <p className="text-center mt-4">
            {t("welcome")} {user?.name}
          </p>

          <Link
            href="/profile"
            className="flex justify-center w-full border-black font-regular border-2 rounded-md mt-4 py-[10px]"
          >
            {t("title")}
          </Link>
          <button
            onClick={() => handleLogout()}
            className=" w-full border-black font-regular border-2 rounded-md mt-4 py-[10px] flex items-center justify-between px-4"
          >
            <img src="/assets/logout.svg" />
            {t("logout")}
          </button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

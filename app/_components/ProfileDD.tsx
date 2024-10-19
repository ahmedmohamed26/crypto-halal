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

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, clearUser } = useUser();
  const t = useTranslations("Profile");
  const router = useRouter();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    clearUser();
    router.push("/login");
  };
  const userInitial = user && user.name.charAt(0).toUpperCase();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="bg-yellow" variant="flat">
          <span className=" text-white text-size18">
            {userInitial || "Profile"}
          </span>
        </Button>
      </DropdownTrigger>
      {/* <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </DropdownTrigger> */}
      <DropdownMenu
        aria-label="Static Actions"
        className="!w-[20vw] hover:bg-transparent"
      >
        <DropdownItem key="new" color={"undefined" as any}>
          <div className="w-full flex justify-center items-center">
            <h3 className="bg-yellow rounded-full py-2 px-4  text-white text-size18 inline-block">
              {userInitial || "Profile"}
            </h3>
          </div>
          <p className="text-center mt-4">
            {t("welcome")} {user?.name}
          </p>

          <button className="w-full border-black font-medium border-2 rounded-md mt-4 py-[10px]">
            {t("editProfile")}
          </button>
          <button
            onClick={() => handleLogout()}
            className="w-full border-black font-medium border-2 rounded-md mt-4 py-[10px] flex items-center justify-between px-4"
          >
            <img src="/assets/logout.svg" />
            {t("logout")}
          </button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
    // <div className="relative inline-block text-left">
    //   <div className="bg-yellow rounded-full py-2 px-4 ">
    //     <button
    //       type="button"
    //       onClick={toggleDropdown}
    //       className="flex items-center focus:outline-none"
    //     >
    //       <span className=" text-white text-size18">
    //         {userInitial || "Profile"}
    //       </span>
    //     </button>
    //   </div>

    //   {isOpen && (
    //     <div className="absolute right-0 z-10 w-80 mt-2 origin-top-right bg-white border border-yellow rounded-md shadow-lg p-4 text-center">
    //       <div className="w-full flex justify-center items-center">
    //         <h3 className="bg-yellow rounded-full py-2 px-4  text-white text-size18 inline-block">
    //           {userInitial || "Profile"}
    //         </h3>
    //       </div>
    //       <p className="text-center mt-4">
    //         {t("welcome")} {user?.name}
    //       </p>

    //       <button className="w-full border-black font-medium border-2 rounded-md mt-4 py-[10px]">
    //         {t("editProfile")}
    //       </button>
    //       <button
    //         onClick={() => handleLogout()}
    //         className="w-full border-black font-medium border-2 rounded-md mt-4 py-[10px] flex items-center justify-between px-4"
    //       >
    //         <img src="/assets/logout.svg" />
    //         {t("logout")}
    //       </button>
    //     </div>
    //   )}
    // </div>
  );
};

export default ProfileDropdown;

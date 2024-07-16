"use client";

import { usePathname, useRouter } from "next/navigation";

import {
  UserIcon as UserIconOutline,
  ChartPieIcon as ChartPieIconOutline,
  ShoppingCartIcon as ShoppingCartIconOutline,
  MapPinIcon as MapPinIconOutline,
  ArchiveBoxIcon as ArchiveBoxIconOutline,
  InboxArrowDownIcon as InboxArrowDownIconOutline,
  TagIcon as TagIconOutline,
  UserIcon,
  EllipsisHorizontalIcon,
  UserCircleIcon,
  ArrowLeftStartOnRectangleIcon,
  SunIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

import {
  UserIcon as UserIconSolid,
  ChartPieIcon as ChartPieIconSolid,
  ShoppingCartIcon as ShoppingCartIconSolid,
  MapPinIcon as MapPinIconSolid,
  ArchiveBoxIcon as ArchiveBoxIconSolid,
  InboxArrowDownIcon as InboxArrowDownIconSolid,
  TagIcon as TagIconSolid,
} from "@heroicons/react/24/solid";
import { useContext, useState } from "react";
import { SidebarContext, UserContext } from "@/utils/contexts";
import { useMutation } from "@apollo/client";
import { LOGOUT } from "@/graphql/mutations/user";
import Image from "next/image";

import sidebarIcon from "../../../../public/sidebar.png";
import sidebarWideIcon from "../../../../public/sidebarWide.png";

export default function Sidebar() {
  const list = [
    {
      id: 1,
      name: "Dashboard",
      iconOutline: <ChartPieIconOutline className="h-7" />,
      iconSolid: <ChartPieIconSolid className="h-7" />,
      to: "/menu/dashboard",
      path: "/menu/dashboard",
    },
    {
      id: 2,
      name: "Buy",
      iconOutline: <InboxArrowDownIconOutline className="h-7" />,
      iconSolid: <InboxArrowDownIconSolid className="h-7" />,
      to: `/menu/buy`,
      path: "/menu/buy",
    },
    {
      id: 3,
      name: "Sell",
      iconOutline: <ShoppingCartIconOutline className="h-7" />,
      iconSolid: <ShoppingCartIconSolid className="h-7" />,
      to: `/menu/sell`,
      path: "/menu/sell",
    },
    {
      id: 4,
      name: "Product",
      iconOutline: <TagIconOutline className="h-7" />,
      iconSolid: <TagIconSolid className="h-7" />,
      to: `/menu/product`,
      path: "/menu/product",
    },
    {
      id: 5,
      name: "Inventory",
      iconOutline: <ArchiveBoxIconOutline className="h-7" />,
      iconSolid: <ArchiveBoxIconSolid className="h-7" />,
      to: `/menu/inventory`,
      path: "/menu/inventory",
    },
    {
      id: 6,
      name: "Outlet",
      iconOutline: <MapPinIconOutline className="h-7" />,
      iconSolid: <MapPinIconSolid className="h-7" />,
      to: `/menu/outlet/outlets`,
      path: "/menu/outlet/outlets",
    },
    {
      id: 7,
      name: "User",
      iconOutline: <UserIconOutline className="h-7" />,
      iconSolid: <UserIconSolid className="h-7" />,
      to: `/menu/user/users`,
      path: "/menu/user",
    },
  ];

  const router = useRouter();
  const pathname = usePathname();

  const { user } = useContext(UserContext);

  const [logout, { loading }] = useMutation(LOGOUT, {
    onCompleted: () => {
      window.location.reload();
    },
  });

  const submit = async () => {
    await logout();
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filterList = user?.menus != undefined ? user?.menus : [];

  const filteredList = list.filter((item) =>
    filterList?.some(
      (filterItem) => filterItem.menu === item.name.toLowerCase()
    )
  );

  const { isWide, setIsWide } = useContext(SidebarContext);

  return (
    <div className="fixed left-0 top-0 z-20 bg-[#EEEEEE] h-screen border-gray-400 border-r flex flex-col justify-between">
      <div className="space-y-3 pl-[35px] pr-10 mt-3">
        <div
          className={`px-[11px] py-3 ${isWide && "w-[170px] flex space-x-4"}`}
        >
          <Image
            src={isWide ? sidebarIcon : sidebarWideIcon}
            alt="sidebarClose"
            className="w-[26px] h-[26px] cursor-pointer"
            onClick={() => setIsWide(!isWide)}
          />
          {/* {isWide && <SunIcon className="w-7" />} */}
          {isWide && (
            <div className="relative">
              <EllipsisVerticalIcon
                className="w-7 cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              {isDropdownOpen && (
                <div className="absolute mt-5 bg-white px-3 py-2 left-0 top-[20px] w-[150px]">
                  <p className="cursor-pointer" onClick={submit}>
                    Logout
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        {filteredList.map((l) => (
          <div
            className={`mt-5 flex ${
              isWide && "w-[170px]"
            } items-center space-x-4 rounded-xl px-[10px] py-3 ${
              !pathname.startsWith(l.path) && "cursor-pointer hover:bg-gray-200"
            }`}
            onClick={() => !pathname.startsWith(l.path) && router.replace(l.to)}
            key={l.id}
          >
            {pathname.startsWith(l.path) ? l.iconSolid : l.iconOutline}
            {isWide && (
              <p
                className={`text-lg ${
                  pathname.startsWith(l.path) ? "font-bold" : "font-light"
                }`}
              >
                {l.name}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

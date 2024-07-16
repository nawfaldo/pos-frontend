"use client";

import SecondaryButton from "@/app/_components/buttons/SecondaryButton";
import { SidebarContext, UserContext } from "@/utils/contexts";
import {
  ArrowLongDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function NavHeader({ createUrl, list }) {
  const pathname = usePathname();
  const router = useRouter();

  const { user } = useContext(UserContext);

  const [search, setSearch] = useState("");

  const { isWide } = useContext(SidebarContext);

  return (
    <div
      className={`fixed top-0 z-10 ${
        isWide ? "pl-[273px]" : "pl-[160px]"
      } h-[50px] flex items-center space-x-[70px] w-screen pr-[30px]`}
    >
      <div className="flex space-x-8">
        {list.map((l) => (
          <div className="items-center flex flex-col">
            <ArrowLongDownIcon
              className={`w-7 ${
                pathname !== l.url ? "text-transparent" : "text-black"
              }`}
            />
            <p
              onClick={() => pathname !== l.url && router.push(l.url)}
              className={`${
                pathname === l.url
                  ? "font-semibold"
                  : "font-light cursor-pointer text-blue-500 hover:underline"
              }`}
            >
              {l.name}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-[25px] bg-[#EEEEEE] rounded-full px-6 h-full w-full flex items-center space-x-3 border border-gray-400">
        <MagnifyingGlassIcon className="w-5 text-gray-600" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent focus:outline-none w-full"
          placeholder="Search"
        />
      </div>
      {pathname !== "/menu/user/roles" &&
        user?.access?.find((d) => d.name === "create").access !== false && (
          <div className="w-[120px] h-full mt-[25px]">
            <SecondaryButton
              action={() => router.push(createUrl)}
              text={"Add"}
            />
          </div>
        )}
    </div>
  );
}

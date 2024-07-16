"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useQuery } from "@apollo/client";
import { GET_AUTH_USER } from "@/graphql/queries/user";

import Sidebar from "./_components/Sidebar";
import Header from "../_components/Header";
import { SidebarContext, ThemeContext, UserContext } from "@/utils/contexts";

export default function MenuLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isWide, setIsWide] = useState(true);

  const menu = () => {
    if (pathname === "/menu/dashboard") {
      return JSON.stringify({
        name: "dashboard",
        details: [{ name: "view" }],
      });
    }
    if (pathname === "/menu/buy") {
      return JSON.stringify({
        name: "buy",
        details: [{ name: "view" }],
      });
    }
    if (pathname === "/menu/sell") {
      return JSON.stringify({
        name: "sell",
        details: [{ name: "view" }],
      });
    }
    if (pathname === "/menu/product") {
      return JSON.stringify({
        name: "product",
        details: [{ name: "view" }],
      });
    }
    if (pathname === "/menu/inventory") {
      return JSON.stringify({
        name: "inventory",
        details: [{ name: "view" }],
      });
    }
    if (pathname === "/menu/outlet") {
      return JSON.stringify({
        name: "outlet",
        details: [{ name: "view" }],
      });
    }

    if (pathname === "/menu/user/users") {
      return JSON.stringify({
        name: "user",
        details: [{ name: "view" }, { name: "create" }],
      });
    }
    if (
      pathname.startsWith("/menu/user/users") &&
      pathname.endsWith("/create")
    ) {
      return JSON.stringify({
        name: "user",
        details: [{ name: "create" }],
      });
    }
    if (pathname.startsWith("/menu/user/users") && pathname.endsWith("/edit")) {
      return JSON.stringify({
        name: "user",
        details: [{ name: "edit" }],
      });
    }
    if (pathname.startsWith("/menu/user/users/")) {
      return JSON.stringify({
        name: "user",
        details: [{ name: "view" }, { name: "edit" }, { name: "delete" }],
      });
    }
    if (pathname === "/menu/user/groups") {
      return JSON.stringify({
        name: "user",
        details: [{ name: "view" }, { name: "create" }],
      });
    }
    if (
      pathname.startsWith("/menu/user/groups") &&
      pathname.endsWith("/create")
    ) {
      return JSON.stringify({
        name: "user",
        details: [{ name: "create" }],
      });
    }
    if (
      pathname.startsWith("/menu/user/groups") &&
      pathname.endsWith("/edit")
    ) {
      return JSON.stringify({
        name: "user",
        details: [{ name: "edit" }],
      });
    }
    if (pathname.startsWith("/menu/user/groups/")) {
      return JSON.stringify({
        name: "user",
        details: [{ name: "view" }, { name: "delete" }, { name: "edit" }],
      });
    }
    if (pathname === "/menu/user/roles") {
      return JSON.stringify({
        name: "user",
        details: [{ name: "view" }],
      });
    }
  };

  const { data, loading } = useQuery(GET_AUTH_USER, {
    variables: {
      menu: menu(),
    },
  });

  useEffect(() => {
    if (!loading) {
      if (!data) {
        router.replace("/auth/login");
      }
      if (data?.getAuthUser?.access) {
        const details = JSON?.parse(data?.getAuthUser?.access);
        if (pathname.endsWith("/create")) {
          const view = details?.find((d) => d.name === "create");
          if (view.access === false) {
            router.back();
          }
        } else if (pathname.endsWith("/edit")) {
          const view = details?.find((d) => d.name === "edit");
          if (view.access === false) {
            router.back();
          }
        } else {
          const view = details?.find((d) => d.name === "view");
          if (view.access === false) {
            router.back();
          }
        }
      }
    }
  }, [loading, data, router]);

  return (
    <div>
      <UserContext.Provider
        value={{
          user: {
            name: data?.getAuthUser?.name,
            groupName: data?.getAuthUser?.userGroup?.name,
            menus:
              data?.getAuthUser?.menus && JSON.parse(data?.getAuthUser?.menus),
            access:
              data?.getAuthUser?.access &&
              JSON.parse(data?.getAuthUser?.access),
          },
        }}
      >
        <SidebarContext.Provider value={{ isWide, setIsWide }}>
          {/* <Header /> */}
          <Sidebar />
          <div className="mt-[100px] w-screen">{children}</div>
        </SidebarContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

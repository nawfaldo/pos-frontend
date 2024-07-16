"use client";

import { useState } from "react";

import Table from "../../_components/Table";
import NavHeader from "../../_components/NavHeader";

export default function Roles() {
  const [search, setSearch] = useState("");

  const data = [
    { id: 1, role: "Dashboard", name: "View" },
    { id: 2, role: "Buy", name: "View" },
    { id: 3, role: "Sell", name: "View" },
    { id: 4, role: "Product", name: "View" },
    { id: 5, role: "Inventory", name: "View" },
    { id: 6, role: "Outlet", name: "View" },
    { id: 7, role: "User", name: "View" },
  ];

  const list = [
    {
      name: "Users",
      url: "/menu/user/users",
    },
    {
      name: "Groups",
      url: "/menu/user/groups",
    },
    {
      name: "Roles",
      url: "/menu/user/roles",
    },
  ];

  return (
    <div>
      <NavHeader list={list} />
      <Table
        headerList={[{ name: "Name" }, { name: "Role" }]}
        isFull={true}
        contentList={
          <>
            {data?.map((d) => (
              <div className="border-b-[1.5px] border-gray-300 grid grid-cols-6 px-5 py-3">
                <p className="font-light">{d?.name}</p>
                <p className="font-light">{d?.role}</p>
              </div>
            ))}
          </>
        }
      />
    </div>
  );
}

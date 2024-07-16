"use client";

import { useRouter } from "next/navigation";

import { useQuery } from "@apollo/client";
import { GET_USER_GROUPS } from "@/graphql/queries/user";

import Table from "../../_components/Table";
import NavHeader from "../../_components/NavHeader";

export default function Page() {
  const { data, loading } = useQuery(GET_USER_GROUPS);

  const router = useRouter();

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
      <NavHeader createUrl={"/menu/user/groups/create"} list={list} />
      <Table
        headerList={[{ name: "Name" }]}
        isFull={true}
        contentList={
          <>
            {data?.getUserGroups?.map((u) => (
              <div className="border-b-[1.5px] border-gray-300 grid grid-cols-6 px-5 py-3">
                <p
                  className="font-light cursor-pointer hover:underline text-blue-500"
                  onClick={() => router.push(`/menu/user/groups/${u?.name}`)}
                >
                  {u?.name}
                </p>
              </div>
            ))}
          </>
        }
      />
    </div>
  );
}

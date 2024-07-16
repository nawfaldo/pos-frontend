"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useQuery } from "@apollo/client";

import { GET_USERS } from "@/graphql/queries/user";

import Table from "../../_components/Table";
import NavHeader from "../../_components/NavHeader";

export default function Users() {
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(20);

  const { data, loading, fetchMore } = useQuery(GET_USERS, {
    variables: { skip, take },
  });

  const next = () => {
    fetchMore({
      variables: { skip: skip + take, take },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return fetchMoreResult;
      },
    });
    setSkip(skip + take);
  };

  const back = () => {
    fetchMore({
      variables: { skip: skip - take, take },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return fetchMoreResult;
      },
    });
    setSkip(skip - take);
  };

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
    <div className="w-full">
      <NavHeader createUrl={"/menu/user/users/create"} list={list} />
      <Table
        skip={skip}
        take={take}
        next={next}
        back={back}
        totalData={data?.getUsers?.userSum}
        headerList={[{ name: "Name" }, { name: "Group" }]}
        isFull={true}
        contentList={
          <>
            {data?.getUsers?.users?.map((u) => (
              <div className="border-b-[1.5px] border-gray-300 grid grid-cols-6 px-5 py-3">
                <p
                  className="font-light cursor-pointer hover:underline text-blue-500"
                  onClick={() => router.push(`/menu/user/users/${u?.name}`)}
                >
                  {u?.name}
                </p>
                <p
                  className="font-light cursor-pointer hover:underline text-blue-500"
                  onClick={() =>
                    router.push(`/menu/user/groups/${u?.userGroup?.name}`)
                  }
                >
                  {u?.userGroup?.name}
                </p>
              </div>
            ))}
          </>
        }
      />
    </div>
  );
}

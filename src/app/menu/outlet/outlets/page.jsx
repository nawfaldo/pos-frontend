"use client";

import { useQuery } from "@apollo/client";
import Table from "../../_components/Table";
import { GET_OUTLETS } from "@/graphql/queries/outlet";
import NavHeader from "../../_components/NavHeader";
import { useRouter } from "next/navigation";

export default function Page() {
  const { data, loading, error, fetchMore } = useQuery(GET_OUTLETS, {
    onError: (e) => {
      console.log("Query Error:", e);
    },
  });

  const list = [
    {
      name: "Outlets",
      url: "/menu/outlet/outlets",
    },
  ];

  const router = useRouter();

  return (
    <div>
      <NavHeader createUrl={"/menu/outlet/outlets/create"} list={list} />
      <Table
        headerList={[{ name: "Name" }]}
        loading={loading}
        name={"outlet"}
        isFull={true}
        contentList={
          <>
            {data?.getOutlets?.outlets?.map((d) => (
              <div className="border-b-[1.5px] border-gray-300 grid grid-cols-6 px-5 py-3">
                <p
                  className="font-light cursor-pointer hover:underline text-blue-500"
                  onClick={() => router.push(`/menu/outlet/outlets/${d?.name}`)}
                >
                  {d?.name}
                </p>
              </div>
            ))}
          </>
        }
      />
    </div>
  );
}

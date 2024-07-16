"use client";

import { SidebarContext } from "@/utils/contexts";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";

export default function Table({
  totalData,
  skip,
  take,
  next,
  back,
  headerList,
  contentList,
  loading,
  name,
  isFull,
}) {
  const { isWide } = useContext(SidebarContext);

  if (loading) {
    return null;
  }

  return (
    <div
      className={
        isFull === true && `${isWide ? "pl-[273px]" : "pl-[160px]"} pr-[30px]`
      }
    >
      {totalData !== 0 ? (
        <>
          <div
            className={`border-gray-400 border grid grid-cols-6 px-5 py-3 bg-gray-200`}
          >
            {headerList.map((h) => (
              <p className={`font-semibold ${h?.last === true && "pl-[50px]"}`}>
                {h.name}
              </p>
            ))}
          </div>
          {contentList}
          {totalData && (
            <div className="flex mt-5 text-sm font-light space-x-5 items-center">
              <p>Items per page: {take}</p>
              <div className="flex items-center text-sm font-light space-x-5">
                <p>
                  {totalData === 0 ? 0 : skip + 1} -{" "}
                  {skip + take >= totalData ? totalData : skip + take} of{" "}
                  {totalData}
                </p>
                <div className="flex space-x-3">
                  <ArrowLeftIcon
                    className={`w-4 ${
                      skip + take !== take ? "cursor-pointer" : "text-gray-400"
                    }`}
                    onClick={() => skip + take !== take && back()}
                  />
                  <ArrowRightIcon
                    className={`w-4 ${
                      skip + take >= totalData
                        ? "text-gray-400"
                        : "cursor-pointer"
                    }`}
                    onClick={() => (skip + take >= totalData ? false : next())}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="font-light">There's no {name} yet.</p>
      )}
    </div>
  );
}

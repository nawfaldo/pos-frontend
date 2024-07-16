"use client";

import SecondaryButton from "@/app/_components/buttons/SecondaryButton";
import Table from "@/app/menu/_components/Table";
import { CheckIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function OutletsUserInput({
  setIsSearch,
  isSearch,
  users,
  setUsers,
  disable,
}) {
  const toggleAccess = (userName, checkName) => {
    setUsers((pre) =>
      pre.map((user) =>
        user.name === userName
          ? {
              ...user,
              checks: user?.checks.map((check) => {
                return { ...check, access: !check.access };
              }),
            }
          : user
      )
    );
  };
  return (
    <div className="space-y-4 px-7 mt-5 relative">
      {disable === false && (
        <div className="h-[50px] w-[100px]">
          <SecondaryButton
            text={"Add User"}
            action={() => setIsSearch(!isSearch)}
          />
        </div>
      )}
      {users?.map((u) => (
        <div className="w-full border-gray-300 border-dashed border-[3px] px-5 py-5 space-y-5">
          <p className="font-semibold text-xl">{u?.name}</p>
          <div className="flex space-x-10">
            {u?.checks?.map((c) => (
              <div className="flex space-x-3">
                <div
                  className={`w-8 h-8 rounded-md flex justify-center items-center ${
                    c?.access
                      ? "bg-blue-500"
                      : `bg-gray-200 border-[1.5px] border-gray-400 ${
                          u?.name !== "Admin" &&
                          disable === false &&
                          "cursor-pointer"
                        }`
                  }`}
                  onClick={() =>
                    disable === false &&
                    u?.name !== "Admin" &&
                    toggleAccess(u?.name, c?.name)
                  }
                >
                  {c.access && (
                    <CheckIcon
                      className={`w-5 stroke-[3px] ${
                        c?.access && "text-white"
                      }`}
                    />
                  )}
                </div>
                <p className="text-sm font-light mt-[5px]">{c?.name}</p>
              </div>
            ))}

            {disable === false && (
              <>
                {u?.name !== "Admin" && (
                  <div className="flex space-x-3 items-center">
                    <div
                      className={`w-8 h-8 rounded-md flex justify-center items-center bg-red-600 cursor-pointer`}
                      onClick={() =>
                        setUsers((i) => i.filter((j) => j.id !== u?.id))
                      }
                    >
                      <TrashIcon className="w-5 text-white" />
                    </div>
                    <p className="text-sm font-light">Remove</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

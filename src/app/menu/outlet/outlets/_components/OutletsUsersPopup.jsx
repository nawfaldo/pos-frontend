"use client";

import DangerButton from "@/app/_components/buttons/DangerButton";
import SecondaryButton from "@/app/_components/buttons/SecondaryButton";
import Table from "@/app/menu/_components/Table";

export default function OutletsUsersPopup({
  isSearch,
  setIsSearch,
  skip,
  take,
  data,
  users,
  setUsers,
}) {
  return (
    <div className="fixed z-30 top-0 left-0 w-full h-full flex items-center justify-center bg-[#EEEEEE] bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10">
      <div className="bg-[#EEEEEE] shadow w-[600px] px-7 py-5 rounded-lg space-y-5">
        <div className="flex justify-between items-center">
          <p className="text-xl font-light">Add User</p>
          <div className="w-[70px] h-[40px]">
            <DangerButton text={"Done"} action={() => setIsSearch(!isSearch)} />
          </div>
        </div>
        <Table
          skip={skip}
          take={take}
          totalData={data?.getUsers?.userSum}
          headerList={[{ name: "Name" }, { last: true, name: "Group" }]}
          contentList={
            <>
              {data?.getUsers?.users?.map((u) => (
                <div className="border-b-[1.5px] border-gray-300 grid grid-cols-6 px-5 py-3 items-center">
                  <p className="font-light col-span-1">{u?.name}</p>
                  <p className="font-light col-span-1 pl-[50px]">
                    {u?.userGroup?.name}
                  </p>
                  <div className="col-span-4 flex justify-end -mr-4">
                    <div className="w-[70px] h-[40px]">
                      {users?.find((i) => i?.id === u?.id) === undefined ? (
                        <SecondaryButton
                          text={"Add"}
                          action={() =>
                            setUsers((old) => [
                              ...old,
                              {
                                id: u?.id,
                                name: u?.name,
                                group: u?.userGroup?.name,
                                checks: [
                                  { name: "Read", access: true },
                                  { name: "Write", access: false },
                                ],
                              },
                            ])
                          }
                        />
                      ) : (
                        <>
                          {u?.name !== "Admin" && (
                            <DangerButton
                              text={"Remove"}
                              action={() =>
                                setUsers((i) => i.filter((j) => j.id !== u?.id))
                              }
                            />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </>
          }
        />
      </div>
    </div>
  );
}

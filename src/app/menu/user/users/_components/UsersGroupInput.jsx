"use client";

import DropdownInput from "@/app/_components/inputs/DropdownInput";

export default function UsersGroupInput({
  groupName,
  setIsShow,
  isShow,
  setGroupName,
  setGroupId,
  error,
  data,
  disable,
}) {
  return (
    <div className="w-full border-gray-300 border-dashed border-[3px] px-5 py-5 space-y-5 col-span-2 self-start">
      <p className="text-xl font-semibold">Group</p>
      <DropdownInput
        name={groupName}
        isShow={isShow}
        setIsShow={setIsShow}
        setName={setGroupName}
        setId={setGroupId}
        error={error}
        disable={disable}
        data={data}
      />
    </div>
  );
}

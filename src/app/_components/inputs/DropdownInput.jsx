"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

import ErrorInfo from "../ErrorInfo";

export default function DropdownInput({
  isShow,
  setIsShow,
  name,
  setName,
  setId,
  disable,
  error,
  data,
}) {
  return (
    <div className="relative">
      <div
        className={`flex space-x-3 ${
          disable ? "bg-gray-200 " : "bg-transparent"
        } px-3 py-2 ${
          isShow
            ? "border-gray-400 border-r-[1.5px] border-l-[1.5px] border-t-[1.5px] rounded-t border-b-[1.5px]"
            : "border-[1.5px] border-gray-400 rounded-lg"
        }`}
      >
        <p className="w-full">{name}</p>
        {disable === false && (
          <>
            {isShow ? (
              <ChevronUpIcon
                className="w-[25px] cursor-pointer hover:text-gray-500"
                onClick={() => setIsShow(!isShow)}
              />
            ) : (
              <ChevronDownIcon
                className="w-[25px] cursor-pointer hover:text-gray-500"
                onClick={() => setIsShow(!isShow)}
              />
            )}
          </>
        )}
      </div>
      {disable === false && (
        <>
          {isShow && (
            <div className="absolute w-full bg-[#EEEEEE] border-gray-400 border-r-[1.5px] border-l-[1.5px] border-b-[1.5px] rounded-b">
              {data?.map((g) => (
                <p
                  className="cursor-pointer hover:bg-gray-200 px-3 py-2"
                  onClick={() => {
                    setName(g.name);
                    setId(g.id);
                    setIsShow(false);
                  }}
                >
                  {g.name}
                </p>
              ))}
            </div>
          )}
          {error?.check && <ErrorInfo error={error?.check} />}
        </>
      )}
    </div>
  );
}

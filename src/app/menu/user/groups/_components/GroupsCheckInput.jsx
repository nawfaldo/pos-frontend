import { CheckIcon } from "@heroicons/react/24/outline";

export default function GroupsCheckInput({ checks, toggleAccess, disable }) {
  return (
    <div className="space-y-4 px-7 mt-5">
      {checks?.map((l) => (
        <div className="space-y-5 w-full border-gray-300 border-dashed border-[3px] px-5 py-5">
          <p className="font-semibold text-xl">{l.name}</p>
          <div className="flex space-x-10">
            {l.details.map((d) => (
              <div className="flex space-x-3">
                <div
                  className={`w-8 h-8 rounded-md ${
                    disable === false && "cursor-pointer"
                  } flex justify-center items-center ${
                    d.access
                      ? "bg-blue-500"
                      : "bg-gray-200 border-[1.5px] border-gray-400"
                  }`}
                  onClick={() =>
                    disable === false && toggleAccess(l.name, d.name)
                  }
                >
                  {d.access && (
                    <CheckIcon
                      className={`w-5 stroke-[3px] ${d.access && "text-white"}`}
                    />
                  )}
                </div>
                <p className="text-sm font-light mt-[5px]">{d.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

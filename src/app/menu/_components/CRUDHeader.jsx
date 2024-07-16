import BackButton from "@/app/_components/buttons/BackButton";
import DangerButton from "@/app/_components/buttons/DangerButton";
import PrimaryButton from "@/app/_components/buttons/PrimaryButton";
import SecondaryButton from "@/app/_components/buttons/SecondaryButton";
import { SidebarContext, UserContext } from "@/utils/contexts";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";

export default function CRUDHeader({
  text,
  createAction,
  createloading,
  editAction,
  editLoading,
  deleteAction,
  deleteLoading,
  editUrl,
}) {
  const router = useRouter();
  const pathname = usePathname();

  const { user } = useContext(UserContext);

  const { isWide } = useContext(SidebarContext);

  return (
    <div
      className={`fixed top-0 z-10 ${
        isWide ? "pl-[273px]" : "pl-[160px]"
      } h-[70px] flex items-center w-screen pr-[30px] py-[10px] justify-between bg-[#EEEEEE] bg-clip-padding backdrop-filter backdrop-blur bg-opacity-70`}
    >
      <div className={`flex space-x-3 items-center mb-2`}>
        {!pathname.endsWith("create") && !pathname.endsWith("edit") && (
          <div className="-ml-[20px]">
            <BackButton />
          </div>
        )}
        <p className="font-thin text-3xl tracking-wide">{text}</p>
      </div>
      {pathname.endsWith("create") && (
        <div className="flex space-x-3 h-full w-[240px]">
          <DangerButton action={() => router.back()} text={"Cancel"} />
          <PrimaryButton action={createAction} text={"Save"} />
        </div>
      )}
      {pathname.endsWith("edit") && (
        <div className="flex space-x-3 h-full">
          <div
            className="h-full text-red-500 hover:text-white items-center flex bg-gray-200 hover:bg-red-400 w-[120px] justify-center border-b-[4px] border-r hover:border-r-0 hover:border-t-0 hover:border-l-0 border-t border-l border-gray-400 hover:border-red-600 rounded-md cursor-pointer font-light"
            onClick={() => router.back()}
          >
            Cancel
          </div>
          <div
            className="h-full font-semibold text-white items-center flex bg-blue-400 hover:bg-blue-500 w-[120px] justify-center border-b-[4px] border-blue-600 hover:border-blue-700 rounded-md cursor-pointer"
            onClick={editAction}
          >
            Save
          </div>
        </div>
      )}
      {!pathname.endsWith("create") && !pathname.endsWith("edit") && (
        <div className="flex space-x-3 h-full w-[240px]">
          {user?.access?.find((d) => d.name === "delete").access !== false && (
            <DangerButton text={"Delete"} action={deleteAction} />
          )}
          {user?.access?.find((d) => d.name === "edit").access !== false && (
            <SecondaryButton
              action={() => router.push(editUrl)}
              text={"Edit"}
            />
          )}
        </div>
      )}
    </div>
  );
}

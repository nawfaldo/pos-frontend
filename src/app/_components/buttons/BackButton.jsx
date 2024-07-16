import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <div
      className="flex space-x-2 items-center cursor-pointer hover:bg-gray-200 px-5 py-2 rounded-lg"
      onClick={() => router.back()}
    >
      <ArrowLeftIcon className="w-5" />
    </div>
  );
}

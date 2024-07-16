import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function ErrorInfo({ error }) {
  return (
    <div className="flex space-x-1">
      <ExclamationCircleIcon className="w-4 text-red-500" />
      <p className="text-sm font-light text-red-500">{error}</p>
    </div>
  );
}

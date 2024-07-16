import { useState } from "react";

import {
  EyeIcon,
  EyeSlashIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import ErrorInfo from "../ErrorInfo";

export default function PasswordInput({
  value,
  setValue,
  label,
  error,
  disable,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-light">{label}</label>
      <div
        className={`flex space-x-3 border-[1.5px] border-gray-400 px-3 py-2 rounded-lg  ${
          disable ? "bg-gray-200 " : "bg-transparent"
        }`}
      >
        <input
          className={`bg-transparent text-xl font-light border-none focus:outline-none w-full`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={showPassword ? "text" : "password"}
          placeholder="..."
          disabled={disable}
        />
        {showPassword ? (
          <EyeIcon
            className="w-[30px] cursor-pointer hover:text-gray-500"
            onClick={togglePasswordVisibility}
          />
        ) : (
          <EyeSlashIcon
            className="w-[30px] cursor-pointer hover:text-gray-500"
            onClick={togglePasswordVisibility}
          />
        )}
      </div>

      {error && <ErrorInfo error={error} />}
    </div>
  );
}

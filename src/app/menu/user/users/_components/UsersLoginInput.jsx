"use client";

import PasswordInput from "@/app/_components/inputs/PasswordInput";
import TextInput from "@/app/_components/inputs/TextInput";

export default function UsersLoginInput({
  name,
  setName,
  password,
  setPassword,
  error,
  disable,
}) {
  return (
    <div className="w-full border-gray-300 border-dashed border-[3px] px-5 py-5 space-y-5 col-span-3">
      <p className="text-xl font-semibold">Login Information</p>
      <div className="space-y-3">
        <TextInput
          label="Name"
          value={name}
          setValue={setName}
          error={error?.name}
          disable={disable}
        />
        <PasswordInput
          label="Password"
          value={password}
          setValue={setPassword}
          error={error?.password}
          disable={disable}
        />
      </div>
    </div>
  );
}

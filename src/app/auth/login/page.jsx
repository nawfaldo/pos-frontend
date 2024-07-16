"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useMutation } from "@apollo/client";

import { LOGIN } from "@/graphql/mutations/user";

import TextInput from "@/app/_components/inputs/TextInput";
import PrimaryButton from "@/app/_components/buttons/PrimaryButton";
import PasswordInput from "@/app/_components/inputs/PasswordInput";

import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function Page() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState({});

  const checkInputBeforeSubmit = () => {
    let _error = {};

    if (name === "") {
      _error.name = "Name is required";
    }
    if (password === "") {
      _error.password = "Password is required";
    }

    if (Object.keys(_error).length !== 0) {
      setError(_error);
      return false;
    }

    return true;
  };

  const router = useRouter();

  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: (d) => {
      router.replace("/menu/" + d?.login?.toMenu);
    },
    onError: (e) => {
      setError({ server: e.message });
    },
  });

  const submit = async () => {
    if (checkInputBeforeSubmit()) {
      await login({
        variables: { name, password },
      });
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="space-y-7 w-[300px]">
        <p className="text-3xl font-bold tracking-[1.5px]">Login</p>
        {error.server && (
          <div className="flex space-x-1">
            <ExclamationCircleIcon className="w-4 text-red-500" />
            <p className="text-sm font-light text-red-500">{error.server}</p>
          </div>
        )}
        <div className="space-y-3 w-full">
          <TextInput
            value={name}
            setValue={setName}
            label="Name"
            error={error.name}
          />
          <PasswordInput
            value={password}
            setValue={setPassword}
            label="Password"
            error={error.password}
          />
        </div>
        <p className="text-sm cursor-pointer font-light">Forgot Password?</p>
        <div className="h-[50px] w-full">
          <PrimaryButton
            text={loading ? "Continuing..." : "Continue"}
            action={submit}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { useMutation, useQuery } from "@apollo/client";
import { CREATE_USER } from "@/graphql/mutations/user";
import { GET_USERS, GET_USER_GROUPS } from "@/graphql/queries/user";

import UsersLoginInput from "../_components/UsersLoginInput";
import UsersGroupInput from "../_components/UsersGroupInput";
import { SidebarContext } from "@/utils/contexts";
import CRUDHeader from "@/app/menu/_components/CRUDHeader";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [groupName, setGroupName] = useState("Not yet selected");
  const [groupId, setGroupId] = useState(0);
  const [isShow, setIsShow] = useState(false);

  const { data, loading } = useQuery(GET_USER_GROUPS);

  const [error, setError] = useState({});

  const checkInputBeforeSubmit = () => {
    let _error = {};

    if (name === "") {
      _error.name = "Name is required";
    }
    if (password === "") {
      _error.password = "Password is required";
    }
    if (groupName === "Not yet selected") {
      _error.group = "Group is required";
    }

    if (Object.keys(_error).length !== 0) {
      setError(_error);
      return false;
    }

    return true;
  };

  const router = useRouter();

  const [createUser, { loading: mutationLoading }] = useMutation(CREATE_USER, {
    onCompleted: () => {
      router.replace("/menu/user/users");
    },
    onError: (e) => {
      setError(JSON.parse(e.message));
    },
    refetchQueries: [{ query: GET_USERS, variables: { skip: 0, take: 20 } }],
  });

  const submit = async () => {
    if (checkInputBeforeSubmit()) {
      await createUser({
        variables: { name, password, userGroupId: groupId },
      });
    }
  };

  const { isWide } = useContext(SidebarContext);

  return (
    <div className="w-full">
      <CRUDHeader
        text="Create User"
        createAction={submit}
        createloading={mutationLoading}
      />
      <div
        className={`px-7 grid grid-cols-5 gap-7 ${
          isWide ? " ml-[245px] " : "ml-[135px] "
        }`}
      >
        <UsersLoginInput
          name={name}
          setName={setName}
          password={password}
          setPassword={setPassword}
          error={error}
          disable={false}
        />
        <UsersGroupInput
          groupName={groupName}
          setIsShow={setIsShow}
          isShow={isShow}
          setGroupName={setGroupName}
          setGroupId={setGroupId}
          error={error}
          data={data?.getUserGroups}
          disable={false}
        />
      </div>
    </div>
  );
}

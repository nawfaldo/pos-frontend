"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER } from "@/graphql/mutations/user";
import { GET_USER, GET_USERS, GET_USER_GROUPS } from "@/graphql/queries/user";

import UsersLoginInput from "../../_components/UsersLoginInput";
import UsersGroupInput from "../../_components/UsersGroupInput";
import { SidebarContext } from "@/utils/contexts";
import CRUDHeader from "@/app/menu/_components/CRUDHeader";

export default function Page({ params }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [groupName, setGroupName] = useState("Not yet selected");
  const [groupId, setGroupId] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [to, setTo] = useState("");

  const [error, setError] = useState({});

  const { data, loading } = useQuery(GET_USER, {
    variables: { name: decodeURIComponent(params.name) },
    onCompleted: (d) => {
      setName(d?.getUser?.name);
      setPassword(d?.getUser?.password);
      setGroupName(d?.getUser?.userGroup?.name);
      setGroupId(d?.getUser?.userGroup?.id);
    },
  });

  const { data: groupData, loading: groupLoading } = useQuery(GET_USER_GROUPS);

  const [updateUser, { loading: mutationLoading }] = useMutation(UPDATE_USER, {
    onCompleted: (data) => {
      setTo(data?.updateUser?.name);
      router.replace("/menu/user/users/" + to);
    },
    onError: (e) => {
      setError(JSON.parse(e.message));
    },
    refetchQueries: [
      { query: GET_USERS, variables: { skip: 0, take: 20 } },
      { query: GET_USER, variables: { name: name } },
    ],
  });

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

  const submit = async () => {
    if (checkInputBeforeSubmit()) {
      if (
        name === data?.getUser?.name &&
        password === data?.getUser?.password &&
        groupId === data?.getUser?.userGroup?.name
      ) {
        router.replace("/menu/user/users/" + to);
        return false;
      }

      await updateUser({
        variables: {
          userId: data?.getUser?.id,
          userName: params.name,
          name: name !== data?.getUser?.name ? name : undefined,
          password: password !== data?.getUser?.password ? password : undefined,
          userGroupId:
            groupId !== data?.getUser?.userGroup?.id ? groupId : undefined,
        },
      });
    }
  };

  const { isWide } = useContext(SidebarContext);

  return (
    <div>
      <CRUDHeader
        text={"Edit User: " + data?.getUser?.name}
        editAction={submit}
        editLoading={mutationLoading}
      />
      <div className={`${isWide ? " ml-[245px] " : "ml-[135px] "}`}>
        <div className="px-7 w-full grid grid-cols-5 gap-7">
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
            data={groupData?.getUserGroups}
            disable={false}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";

import { useMutation, useQuery } from "@apollo/client";
import { DELETE_USER } from "@/graphql/mutations/user";
import { GET_USER, GET_USERS } from "@/graphql/queries/user";

import UsersLoginInput from "../_components/UsersLoginInput";
import UsersGroupInput from "../_components/UsersGroupInput";
import { useContext } from "react";
import { SidebarContext } from "@/utils/contexts";
import CRUDHeader from "@/app/menu/_components/CRUDHeader";

export default function Page({ params }) {
  const { data, loading } = useQuery(GET_USER, {
    variables: { name: decodeURIComponent(params.name) },
  });

  const router = useRouter();

  const [deleteUser, { loading: mutationLoading }] = useMutation(DELETE_USER, {
    onCompleted: () => {
      router.replace("/menu/user/users");
    },
    refetchQueries: [{ query: GET_USERS, variables: { skip: 0, take: 20 } }],
  });

  const submit = async () => {
    await deleteUser({
      variables: {
        id: data?.getUser?.id,
      },
    });
  };

  const { isWide } = useContext(SidebarContext);

  return (
    <div>
      <CRUDHeader
        text={"View User: " + data?.getUser?.name}
        editUrl={`/menu/user/users/${data?.getUser?.name}/edit`}
        deleteAction={submit}
        deleteLoading={mutationLoading}
      />
      <div className={`${isWide ? " ml-[245px] " : "ml-[135px] "}`}>
        <div className="px-7 w-full grid grid-cols-5 gap-7">
          <UsersLoginInput
            name={data?.getUser?.name}
            password={data?.getUser?.password}
            disable={true}
          />
          <UsersGroupInput
            groupName={data?.getUser?.userGroup?.name}
            disable={true}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import { useMutation, useQuery } from "@apollo/client";
import { DELETE_USER_GROUP } from "@/graphql/mutations/user";
import { GET_USER_GROUP, GET_USER_GROUPS } from "@/graphql/queries/user";

import GroupsGroupInput from "../_components/GroupsGroupInput";
import GroupsCheckInput from "../_components/GroupsCheckInput";
import { SidebarContext } from "@/utils/contexts";
import CRUDHeader from "@/app/menu/_components/CRUDHeader";

export default function Page({ params }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const [error, setError] = useState({});

  const { data, loading } = useQuery(GET_USER_GROUP, {
    variables: { name: decodeURIComponent(params.name) },
    onCompleted: (d) => {
      setName(d?.getUserGroup?.name);
    },
  });

  const [tab, setTab] = useState(1);

  const tabList = [
    { name: "Role", id: 1 },
    { name: "Outlet", id: 2 },
  ];

  const [deleteUserGroup, { loading: mutationLoading }] = useMutation(
    DELETE_USER_GROUP,
    {
      onCompleted: () => {
        router.replace("/menu/user/groups");
      },
      refetchQueries: [{ query: GET_USER_GROUPS }],
      onError: (e) => {
        setError(JSON.parse(e.message));
      },
    }
  );

  const submit = async () => {
    await deleteUserGroup({
      variables: {
        id: data?.getUserGroup?.id,
      },
    });
  };

  const { isWide } = useContext(SidebarContext);

  return (
    <div>
      <CRUDHeader
        text={"View Group: " + data?.getUserGroup?.name}
        deleteAction={submit}
        deleteLoading={mutationLoading}
        editUrl={"/menu/user/groups/" + data?.getUserGroup?.name + "/edit"}
      />
      <div
        className={`space-y-5 ${
          isWide ? " ml-[245px] " : "ml-[124px] "
        } mt-[85px] mb-[50px]`}
      >
        <GroupsGroupInput
          name={name}
          setName={setName}
          error={error}
          setDesc={setDesc}
          desc={desc}
          disable={true}
        />
        <div className="mt-7">
          <div className="border-b border-gray-400 flex items-center pl-7 space-x-8">
            {tabList?.map((t) => (
              <p
                className={`text-lg pb-2 ${
                  tab === t.id
                    ? "font-semibold border-b-[2px] border-black"
                    : "font-light cursor-pointer"
                }`}
                onClick={() => tab !== t.id && setTab(t.id)}
              >
                {t.name}
              </p>
            ))}
          </div>
          {tab === 1 && (
            <GroupsCheckInput
              checks={data?.getUserGroup?.roles}
              disable={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}

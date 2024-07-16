"use client";

import CRUDHeader from "@/app/menu/_components/CRUDHeader";
import { SidebarContext } from "@/utils/contexts";
import { useContext, useState } from "react";
import OutletsGeneralInput from "../_components/OutletsGeneralInput";
import TabList from "@/app/menu/_components/TabList";
import OutletsUserInput from "../_components/OutletsUserInput";
import { GET_OUTLET, GET_OUTLETS } from "@/graphql/queries/outlet";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_OUTLET } from "@/graphql/mutations/outlet";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const { isWide } = useContext(SidebarContext);

  const [tab, setTab] = useState(1);

  const tabList = [{ name: "User", id: 1 }];

  const [users, setUsers] = useState([]);

  const { data, loading, error, fetchMore } = useQuery(GET_OUTLET, {
    variables: { name: params.name },
    onCompleted: (d) => {
      const _users = d?.getOutlet?.users;
      const mappedUsers = [];
      _users.forEach((u) => {
        const setAccess = () => {
          let access = [
            { name: "Read", access: false },
            { name: "Write", access: false },
          ];
          if (u.access === 1) {
            access[1].access = true;
            return access;
          }
          if (u.access === 2) {
            access[0].access = true;
            return access;
          }
        };
        mappedUsers.push({ name: u?.name, checks: setAccess() });
      });
      setUsers(mappedUsers);
    },
  });

  const router = useRouter();

  const [deleteOutlet, { loading: mutationLoading }] = useMutation(
    DELETE_OUTLET,
    {
      onCompleted: () => {
        router.replace("/menu/outlet/outlets/");
      },
      refetchQueries: [{ query: GET_OUTLETS }],
    }
  );

  const submit = async () => {
    await deleteOutlet({
      variables: {
        id: data?.getOutlet?.id,
      },
    });
  };

  return (
    <div>
      <CRUDHeader
        text={"View Outlet: " + params?.name}
        editUrl={"/menu/outlet/outlets/" + params.name + "/edit"}
        deleteAction={submit}
        deleteLoading={mutationLoading}
      />
      <div
        className={`space-y-5 ${
          isWide ? "ml-[245px]" : "ml-[124px]"
        } mt-[85px] mb-[50px]`}
      >
        <OutletsGeneralInput disable={true} name={params?.name} />
        <TabList tab={tab} tabList={tabList} setTab={setTab} />
        {tab === 1 && <OutletsUserInput disable={true} users={users} />}
      </div>
    </div>
  );
}

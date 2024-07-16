"use client";

import CRUDHeader from "@/app/menu/_components/CRUDHeader";
import { SidebarContext } from "@/utils/contexts";
import { useContext, useState } from "react";
import OutletsGeneralInput from "../_components/OutletsGeneralInput";
import TabList from "@/app/menu/_components/TabList";
import OutletsUserInput from "../_components/OutletsUserInput";
import ErrorInfo from "@/app/_components/ErrorInfo";
import SecondaryButton from "@/app/_components/buttons/SecondaryButton";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USERS } from "@/graphql/queries/user";
import Table from "@/app/menu/_components/Table";
import { CREATE_OUTLET } from "@/graphql/mutations/outlet";
import DangerButton from "@/app/_components/buttons/DangerButton";
import { GET_OUTLETS } from "@/graphql/queries/outlet";
import OutletsUsersPopup from "../_components/OutletsUsersPopup";
import { useRouter } from "next/navigation";

export default function Page() {
  const { isWide } = useContext(SidebarContext);

  const [name, setName] = useState("");

  const [error, setError] = useState({});

  const [tab, setTab] = useState(1);

  const tabList = [{ name: "User", id: 1 }];

  const [isSearch, setIsSearch] = useState(false);

  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(20);

  const [users, setUsers] = useState([]);

  const { data, loading, fetchMore } = useQuery(GET_USERS, {
    variables: { skip, take },
    onCompleted: (d) => {
      setUsers((old) => [
        ...old,
        {
          id: 1,
          name: "Admin",
          checks: [
            { name: "Read", access: false },
            { name: "Write", access: true },
          ],
        },
      ]);
    },
  });

  const checkInputBeforeSubmit = () => {
    let _error = {};

    if (name === "") {
      _error.name = "Name is required";
    }

    if (Object.keys(_error).length !== 0) {
      setError(_error);
      return false;
    }

    setError({});

    return true;
  };

  const router = useRouter();

  const [createOutlet, { loading: mutationLoading }] = useMutation(
    CREATE_OUTLET,
    {
      onCompleted: () => {
        router.replace("/menu/outlet/outlets");
      },
      onError: (e) => {
        setError(JSON.parse(e.message));
      },
      refetchQueries: [{ query: GET_OUTLETS }],
    }
  );

  const submit = async () => {
    if (checkInputBeforeSubmit()) {
      let mappedUsers = [];

      users.forEach((u) => {
        const toAccess = u.checks.find((c) => c.access === true);
        const access = () => {
          if (toAccess?.name === "Write") {
            return 1;
          }
          if (toAccess?.name === "Read") {
            return 2;
          }
        };
        mappedUsers.push({ id: u.id, access: access() });
      });

      await createOutlet({
        variables: { name, users: JSON.stringify(mappedUsers) },
      });
    }
  };

  return (
    <div>
      <CRUDHeader
        text="Create Outlet"
        createloading={mutationLoading}
        createAction={submit}
      />
      <div
        className={`space-y-5 ${
          isWide ? " ml-[245px] " : "ml-[124px] "
        } mt-[85px] mb-[50px]`}
      >
        <OutletsGeneralInput
          disable={false}
          name={name}
          setName={setName}
          error={error}
        />
        <div>
          <TabList tab={tab} tabList={tabList} setTab={setTab} />
          {error?.check && <ErrorInfo error={error?.check} />}
          {tab === 1 && (
            <OutletsUserInput
              isSearch={isSearch}
              setIsSearch={setIsSearch}
              users={users}
              setUsers={setUsers}
              disable={false}
            />
          )}
        </div>
      </div>
      {isSearch && (
        <OutletsUsersPopup
          isSearch={isSearch}
          setIsSearch={setIsSearch}
          skip={skip}
          take={take}
          data={data}
          users={users}
          setUsers={setUsers}
        />
      )}
    </div>
  );
}

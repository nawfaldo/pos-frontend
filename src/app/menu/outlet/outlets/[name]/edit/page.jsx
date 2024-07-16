"use client";

import CRUDHeader from "@/app/menu/_components/CRUDHeader";
import { SidebarContext } from "@/utils/contexts";
import { useContext, useState } from "react";
import OutletsGeneralInput from "../../_components/OutletsGeneralInput";
import TabList from "@/app/menu/_components/TabList";
import OutletsUserInput from "../../_components/OutletsUserInput";
import { useMutation, useQuery } from "@apollo/client";
import { GET_OUTLET, GET_OUTLETS } from "@/graphql/queries/outlet";
import OutletsUsersPopup from "../../_components/OutletsUsersPopup";
import { GET_USERS } from "@/graphql/queries/user";
import { EDIT_OUTLET } from "@/graphql/mutations/outlet";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const { isWide } = useContext(SidebarContext);

  const [tab, setTab] = useState(1);

  const tabList = [{ name: "User", id: 1 }];

  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(20);

  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [baseUsers, setBaseUsers] = useState([]);

  const [error, setError] = useState();

  const [isSearch, setIsSearch] = useState(false);

  const { data: userData } = useQuery(GET_USERS, {
    variables: { skip, take },
  });

  const { data, loading } = useQuery(GET_OUTLET, {
    variables: { name: params.name },
    onCompleted: (d) => {
      setName(d?.getOutlet?.name);
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
        mappedUsers.push({ id: u?.id, name: u?.name, checks: setAccess() });
      });
      setUsers(mappedUsers);
      setBaseUsers(mappedUsers);
    },
  });

  function getChangedAccess(initialArray, updatedArray) {
    const changedItems = updatedArray.reduce((changedItems, updatedItem) => {
      const initialItem = initialArray.find(
        (item) => item.id === updatedItem.id
      );

      if (initialItem) {
        const changedChecks = updatedItem.checks.filter((check, index) => {
          return !initialItem.checks[index].access && check.access;
        });

        const format = () => {
          if (changedChecks[0]?.name === "Write") {
            return 1;
          }
          if (changedChecks[0]?.name === "Read") {
            return 2;
          }
        };

        if (changedChecks.length > 0) {
          changedItems.push({
            id: updatedItem.id,
            change: format(),
          });
        }
      } else {
        const format = (checks) => {
          if (checks?.name === "Write") {
            return 1;
          }
          if (checks?.name === "Read") {
            return 2;
          }
        };

        changedItems.push({
          id: updatedItem.id,
          change: format(updatedItem.checks.find((c) => c.access === true)),
          added: true,
        });
      }

      return changedItems;
    }, []);

    const removedItems = initialArray
      .filter(
        (initialItem) =>
          !updatedArray.some((updatedItem) => updatedItem.id === initialItem.id)
      )
      .map((item) => ({
        id: item.id,
        removed: true,
      }));

    return [...changedItems, ...removedItems];
  }

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

  const [editOutlet, { loading: mutationLoading }] = useMutation(EDIT_OUTLET, {
    onCompleted: () => {
      router.replace("/menu/outlet/outlets/");
    },
    onError: (e) => {
      setError(JSON.parse(e.message));
    },
    refetchQueries: [
      { query: GET_OUTLETS },
      { query: GET_OUTLET, variables: { name } },
    ],
  });

  const submit = async () => {
    if (checkInputBeforeSubmit()) {
      const changes = getChangedAccess(baseUsers, users);
      if (name === params.name && changes.length === 0) {
        router.push("/menu/outlet/outlets/");
        return false;
      }
      await editOutlet({
        variables: {
          id: data?.getOutlet?.id,
          name: name === params.name ? undefined : name,
          users: changes.length === 0 ? undefined : JSON.stringify(changes),
        },
      });
    }
  };

  return (
    <div>
      <CRUDHeader
        text={"Edit Outlet: " + params?.name}
        editAction={submit}
        editLoading={loading}
      />
      <div
        className={`space-y-5 ${
          isWide ? "ml-[245px]" : "ml-[124px]"
        } mt-[85px] mb-[50px]`}
      >
        <OutletsGeneralInput
          disable={false}
          name={name}
          setName={setName}
          error={error}
        />
        <TabList tab={tab} tabList={tabList} setTab={setTab} />
        {tab === 1 && (
          <OutletsUserInput
            disable={false}
            users={users}
            setUsers={setUsers}
            setIsSearch={setIsSearch}
            isSearch={isSearch}
          />
        )}
      </div>
      {isSearch && (
        <OutletsUsersPopup
          isSearch={isSearch}
          setIsSearch={setIsSearch}
          skip={skip}
          take={take}
          data={userData}
          users={users}
          setUsers={setUsers}
        />
      )}
    </div>
  );
}

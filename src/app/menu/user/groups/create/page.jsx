"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { useMutation } from "@apollo/client";
import { CREATE_USER_GROUP } from "@/graphql/mutations/user";
import { GET_USER_GROUPS } from "@/graphql/queries/user";

import GroupsGroupInput from "../_components/GroupsGroupInput";
import GroupsCheckInput from "../_components/GroupsCheckInput";
import ErrorInfo from "@/app/_components/ErrorInfo";
import { SidebarContext } from "@/utils/contexts";
import CRUDHeader from "@/app/menu/_components/CRUDHeader";
import TabList from "@/app/menu/_components/TabList";

export default function Page() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const [error, setError] = useState({});

  const [checks, setChecks] = useState([
    { name: "Dashboard", details: [{ name: "View", access: false }] },
    { name: "Buy", details: [{ name: "View", access: false }] },
    { name: "Sell", details: [{ name: "View", access: false }] },
    { name: "Product", details: [{ name: "View", access: false }] },
    { name: "Inventory", details: [{ name: "View", access: false }] },
    {
      name: "Outlet",
      details: [
        { name: "View", access: false },
        { name: "Create", access: false },
        { name: "Edit", access: false },
        { name: "Delete", access: false },
      ],
    },
    {
      name: "User",
      details: [
        { name: "View", access: false },
        { name: "Create", access: false },
        { name: "Edit", access: false },
        { name: "Delete", access: false },
      ],
    },
  ]);

  const toggleAccess = (itemName, detailName) => {
    setChecks((prevChecks) =>
      prevChecks.map((check) =>
        check.name === itemName
          ? {
              ...check,
              details: check.details.map((detail) =>
                detail.name === detailName
                  ? { ...detail, access: !detail.access }
                  : detail
              ),
            }
          : check
      )
    );
  };

  const router = useRouter();

  const [tab, setTab] = useState(1);

  const tabList = [
    { name: "Role", id: 1 },
    { name: "Outlet", id: 2 },
  ];

  const [createUserGroup, { loading: mutationLoading }] = useMutation(
    CREATE_USER_GROUP,
    {
      onCompleted: () => {
        router.replace("/menu/user/groups");
      },
      onError: (e) => {
        setError(JSON.parse(e.message));
      },
      refetchQueries: [{ query: GET_USER_GROUPS }],
    }
  );

  const checkInputBeforeSubmit = () => {
    setError({});

    let _error = {};

    if (name === "") {
      _error.name = "Name is required";
    }

    const checkView = () => {
      for (let i of checks) {
        const view = i.details.find((d) => d.name === "View");
        if (view.access === true) {
          return true;
        }
      }
      return false;
    };

    if (checkView() === false) {
      _error.check = "Must at least have one view";
    }

    if (Object.keys(_error).length !== 0) {
      setError(_error);
      return false;
    }

    return true;
  };

  const submit = async () => {
    if (checkInputBeforeSubmit()) {
      await createUserGroup({
        variables: {
          name,
          check: JSON.stringify(checks),
        },
      });
    }
  };

  const { isWide } = useContext(SidebarContext);

  return (
    <div>
      <CRUDHeader
        text={"Create Group"}
        createAction={submit}
        createloading={mutationLoading}
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
          disable={false}
        />
        <div>
          <TabList tab={tab} tabList={tabList} setTab={setTab} />
          {error?.check && <ErrorInfo error={error?.check} />}
          {tab === 1 && (
            <GroupsCheckInput
              checks={checks}
              toggleAccess={toggleAccess}
              disable={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}

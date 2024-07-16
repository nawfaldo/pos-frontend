"use client";

import { EDIT_USER_GROUP } from "@/graphql/mutations/user";
import { GET_USER_GROUP, GET_USER_GROUPS } from "@/graphql/queries/user";

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import GroupsGroupInput from "../../_components/GroupsGroupInput";
import ErrorInfo from "@/app/_components/ErrorInfo";
import GroupsCheckInput from "../../_components/GroupsCheckInput";
import { SidebarContext } from "@/utils/contexts";
import CRUDHeader from "@/app/menu/_components/CRUDHeader";

export default function Page({ params }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const [error, setError] = useState({});

  const [check, setCheck] = useState([]);

  const [preCheck, setPreCheck] = useState([]);

  const { data, loading } = useQuery(GET_USER_GROUP, {
    variables: { name: decodeURIComponent(params.name) },
    onCompleted: (d) => {
      setName(d?.getUserGroup?.name);

      let _check = [];

      d?.getUserGroup?.roles.forEach((r) => {
        let roles = { name: r.name, details: [] };
        r?.details.forEach((d) => {
          roles.details.push({ id: d.id, name: d.name, access: d.access });
        });
        _check.push(roles);
      });

      setCheck(_check);
      setPreCheck(_check);
    },
  });

  const [tab, setTab] = useState(1);

  const tabList = [
    { name: "Role", id: 1 },
    { name: "Outlet", id: 2 },
  ];

  const handleToggleAccess = (roleName, detailName) => {
    setCheck((prevCheck) =>
      prevCheck.map((role) =>
        role.name === roleName
          ? {
              ...role,
              details: role.details.map((detail) =>
                detail.name === detailName
                  ? { ...detail, access: !detail.access }
                  : detail
              ),
            }
          : role
      )
    );
  };

  const [editUserGroup, { loading: mutationLoading }] = useMutation(
    EDIT_USER_GROUP,
    {
      onCompleted: () => {
        router.replace("/menu/user/groups/" + name);
      },
      onError: (e) => {
        setError(JSON.parse(e.message));
        // console.log(e.message);
      },
      refetchQueries: [
        { query: GET_USER_GROUPS },
        { query: GET_USER_GROUP, variables: { name } },
      ],
    }
  );

  const checkInputBeforeSubmit = () => {
    let _error = {};

    if (name === "") {
      _error.name = "Name is required";
    }

    const allViewsFalse = check.every((item) => {
      const viewAccess = item.details.find((detail) => detail.name === "view");
      return viewAccess ? viewAccess.access === false : true;
    });

    if (allViewsFalse) {
      _error.check = "Must at least have one view";
    }

    if (Object.keys(_error).length !== 0) {
      setError(_error);
      return false;
    }

    return true;
  };

  const compareChanges = (preCheck, check) => {
    let changes = [];

    preCheck.forEach((preRole, i) => {
      let roleChanges = [];

      preRole.details.forEach((preDetail, j) => {
        if (preDetail.access !== check[i].details[j].access) {
          roleChanges.push({
            id: preDetail.id,
            access: check[i].details[j].access,
          });
        }
      });

      if (roleChanges.length > 0) {
        changes.push(roleChanges);
      }
    });

    return changes;
  };

  const submit = async () => {
    if (checkInputBeforeSubmit()) {
      let changes = compareChanges(preCheck, check);
      if (changes.length === 0 && data?.getUserGroup?.name === name) {
        return router.replace("/menu/user/groups/" + data?.getUserGroup?.name);
      }
      await editUserGroup({
        variables: {
          id: data?.getUserGroup?.id,
          name: data?.getUserGroup?.name === name ? undefined : name,
          check: JSON.stringify(changes),
        },
      });
    }
  };

  const { isWide } = useContext(SidebarContext);

  return (
    <div>
      <CRUDHeader
        text={"Edit Group: " + data?.getUserGroup?.name}
        editAction={submit}
        editLoading={mutationLoading}
      />{" "}
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
        <div className="mt-5">
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
          {error?.check && <ErrorInfo error={error?.check} />}
          {tab === 1 && (
            <GroupsCheckInput
              checks={check}
              toggleAccess={handleToggleAccess}
              disable={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}

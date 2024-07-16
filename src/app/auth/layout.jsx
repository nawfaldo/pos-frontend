"use client";

import { useQuery } from "@apollo/client";

import { GET_AUTH_USER } from "@/graphql/queries/user";

import Header from "../_components/Header";

export default function AuthLayout({ children }) {
  const { data, loading } = useQuery(GET_AUTH_USER);

  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

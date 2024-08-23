import { redirect } from "next/navigation";
import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

const MyAccountPage = async () => {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/");
  }

  const user = await api.user.getUser({ id: session.user.id });

  return <div>{JSON.stringify(user)}</div>;
};

export default MyAccountPage;

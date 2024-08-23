import { redirect } from "next/navigation";
import { type FC } from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

interface AccountPageProps {
  params: { id: string };
}

const AccountPage: FC<AccountPageProps> = async ({ params: { id } }) => {
  const user = await api.user.getUser({ id });

  if (!user) {
    // No user
    return redirect("/");
  }

  const session = await getServerAuthSession();

  if (session && user.id === session.user.id) {
    // account page user is user
    return redirect("/account");
  }

  return <div>{JSON.stringify(user)}</div>;
};

export default AccountPage;

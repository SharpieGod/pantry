import { redirect } from "next/navigation";
import { type FC } from "react";
import AccountDisplay from "~/components/AccountDisplay";
import Navbar from "~/components/Navbar";
import PostCard from "~/components/PostCard";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

interface AccountPageProps {
  params: { id: string };
}

const AccountPage: FC<AccountPageProps> = async ({ params: { id } }) => {
  const user = await api.user.getUser({ id });

  if (!user) {
    return redirect("/");
  }

  const session = await getServerAuthSession();

  if (session && user.id === session.user.id) {
    return redirect("/account");
  }

  const posts = await api.post.listByUser({ userId: id });

  console.log(`Fetched posts for user ${id}:`, posts);

  return (
    <>
      <Navbar />
      <AccountDisplay userId={id} isSelf={false} />
    </>
  );
};

export default AccountPage;

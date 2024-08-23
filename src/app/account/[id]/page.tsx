import { redirect } from "next/navigation";
import { type FC } from "react";
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
    <div>
      <Navbar />
      <div className="mx-auto w-3/5">
        <h1 className="py-4 text-2xl font-semibold opacity-80">
          {user.name}'s Posts
        </h1>
        {posts.length === 0 ? (
          <p>No public posts available.</p>
        ) : (
          <ul className="flex flex-wrap items-center gap-8">
            {posts.map((p) => (
              <PostCard post={p} key={p.id} />
            ))}
          </ul>

        )}
      </div>
    </div>
  );
};

export default AccountPage;

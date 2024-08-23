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
      <h1>{user.name}'s Posts</h1>
      {posts.length === 0 ? (
        <p>No public posts available.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AccountPage;

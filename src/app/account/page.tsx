import { redirect } from "next/navigation";
import React from "react";
import Navbar from "~/components/Navbar";
import PostCardEdit from "~/components/PostCardEdit";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

const MyAccountPage = async () => {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/");
  }

  const posts = await api.post.listByUser({ userId: session.user.id });
  return (
    <div>
      <Navbar />
      <div className="mx-auto w-3/5">
        <h1 className="py-4 text-2xl font-semibold opacity-80">
          Hello, {session.user.name}
        </h1>
        <ul className="flex flex-wrap items-center gap-8">
          {posts.map((p) => (
            <PostCardEdit post={p} key={p.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyAccountPage;

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
      <ul className="flex gap-4 p-4">
        {posts.map((p) => (
          <PostCardEdit post={p} key={p.id} />
        ))}
      </ul>
    </div>
  );
};

export default MyAccountPage;

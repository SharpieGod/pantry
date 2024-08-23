import { redirect } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

const NewPost = async () => {
  const session = await getServerAuthSession();

  if (!session) {
    // not logged in
    return redirect("/");
  }
  const newPost = await api.post.newPost({ title: "" });

  return redirect(`/post/edit/${newPost.id}`);
};

export default NewPost;

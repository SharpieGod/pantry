import { redirect } from "next/navigation";
import { type FC } from "react";
import Navbar from "~/components/Navbar";
import { api } from "~/trpc/server";

interface PostViewProps {
  params: { id: string };
}

const PostView: FC<PostViewProps> = async ({ params: id }) => {
  const post = await api.post.getPost(id);

  if (!post) return redirect("/");

  return (
    <div>
      <Navbar />
      {JSON.stringify(post)}
    </div>
  );
};

export default PostView;

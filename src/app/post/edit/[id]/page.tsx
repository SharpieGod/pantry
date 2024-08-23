import { redirect } from "next/navigation";
import { type FC } from "react";
import EditPost from "~/components/EditPost";
import Navbar from "~/components/Navbar";
import { api } from "~/trpc/server";

interface EditPostPageProps {
  params: { id: string };
}

const EditPostPage: FC<EditPostPageProps> = async ({ params: { id } }) => {
  const post = await api.post.getPost({ id });

  if (!post) {
    return redirect("/");
  }

  return (
    <div>
      <Navbar />
      <EditPost defaultPost={post} />
    </div>
  );
};

export default EditPostPage;

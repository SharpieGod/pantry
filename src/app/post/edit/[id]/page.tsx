import { redirect } from "next/navigation";
import { type FC } from "react";
import EditPost from "~/components/EditPost";
import Navbar from "~/components/Navbar";
import { api } from "~/trpc/server";

interface EditPostPageProps {
  params: { id: string };
}

const EditPostPage: FC<EditPostPageProps> = async ({ params: { id } }) => {
  return (
    <div className="">
      <Navbar />
      <EditPost postId={id} />
    </div>
  );
};

export default EditPostPage;

import { redirect } from "next/navigation";
import { type FC } from "react";
import Navbar from "~/components/Navbar";
import PostDisplay from "~/components/PostDisplay";
import { api } from "~/trpc/server";

interface PostViewProps {
  params: { id: string };
}

const PostView: FC<PostViewProps> = async ({ params: { id } }) => {
  return (
    <div>
      <Navbar />
      <PostDisplay id={id} />
    </div>
  );
};

export default PostView;

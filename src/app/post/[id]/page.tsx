import { redirect } from "next/navigation";
import { type FC } from "react";
import Navbar from "~/components/Navbar";
import PostDisplay from "~/components/PostDisplay";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

interface PostViewProps {
  params: { id: string };
}

const PostView: FC<PostViewProps> = async ({ params: { id } }) => {
  const session = await getServerAuthSession();

  return (
    <div>
      <Navbar />
      <PostDisplay id={id} userId={session?.user.id} />
    </div>
  );
};

export default PostView;

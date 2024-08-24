"use client";
import { useEffect, useState, type FC } from "react";
import Navbar from "./Navbar";

import PostCard from "./PostCard";
import PostCardEdit from "./PostCardEdit";
import { api } from "~/trpc/react";
import { Post } from "@prisma/client";
import { LuEye, LuEyeOff } from "react-icons/lu";

interface AccountDisplayProps {
  userId: string;
  isSelf: boolean;
}

const AccountDisplay: FC<AccountDisplayProps> = ({ userId, isSelf }) => {
  const { data: user, isLoading: userLoading } = api.user.getUser.useQuery({
    id: userId,
  });

  const { data: posts, isLoading: postsLoading } = api.post.listByUser.useQuery(
    {
      userId,
    },
  );

  const [publicPosts, setPublicPosts] = useState<Post[]>([]);
  const [privatePosts, setPrivatePosts] = useState<Post[]>([]);

  useEffect(() => {
    if (postsLoading || !posts) return;

    const publicPosts = posts
      .filter((post) => post.postState === "PUBLIC")
      .sort(
        (a, b) =>
          new Date(b.publishedAt ?? "").getTime() -
          new Date(a.publishedAt ?? "").getTime(),
      );

    const privatePosts = posts.filter((post) => post.postState === "PRIVATE");

    setPublicPosts(publicPosts);
    setPrivatePosts(privatePosts);
  }, [posts, postsLoading]);

  return userLoading ? (
    <div className="w-full p-4 text-center text-lg">Loading...</div>
  ) : (
    <div>
      <div className="mx-auto w-3/5">
        <h1 className="py-4 text-3xl font-semibold">
          {isSelf ? `Hello, ${user?.name}` : `${user?.name}'s profile`}
        </h1>
        {postsLoading ? (
          <div className="w-full p-4 text-center text-lg">Loading...</div>
        ) : !isSelf ? (
          <ul className="grid grid-cols-3 items-center gap-8 *:w-full">
            {posts?.map((p) => <PostCard post={p} key={p.id} />)}
          </ul>
        ) : (
          <ul className="flex flex-col gap-16">
            {publicPosts && (
              <li className="flex flex-col gap-4">
                <div className="flex items-center gap-2 opacity-80">
                  <h1 className="text-xl">Public Posts</h1>
                  <LuEye size={20} />
                </div>
                <ul className="grid grid-cols-3 items-center gap-8 *:w-full">
                  {publicPosts.map((p) => (
                    <PostCardEdit post={p} key={p.id} />
                  ))}
                </ul>
              </li>
            )}
            {privatePosts && (
              <li className="flex flex-col gap-4">
                <div className="flex items-center gap-2 opacity-80">
                  <h1 className="text-xl">Private Posts</h1>
                  <LuEyeOff size={20} />
                </div>
                <ul className="grid grid-cols-3 items-center gap-8 *:w-full">
                  {privatePosts?.map((p) => (
                    <PostCardEdit post={p} key={p.id} />
                  ))}
                </ul>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AccountDisplay;
